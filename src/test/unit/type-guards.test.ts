import * as assert from "assert";
import {
  ColorThemeSetting,
  isColorThemeSetting,
} from "../../src/types/colorThemeSetting";
import {
  ThemeGroupInfo,
  ThemeInfo,
  isThemeGroupInfo,
  isThemeInfo,
} from "../../src/types/themeInfo";

suite("Type Guards", () => {
  suite("isThemeInfo", () => {
    test("should return true for valid ThemeInfo object", () => {
      const validThemeInfo: ThemeInfo = {
        label: "Dracula",
        uiTheme: "vs-dark",
        path: "./themes/dracula.json",
      };

      assert.strictEqual(isThemeInfo(validThemeInfo), true);
    });

    test("should return true for valid ThemeInfo object with id", () => {
      const validThemeInfo: ThemeInfo = {
        id: "dracula-theme.dracula",
        label: "Dracula",
        uiTheme: "vs-dark",
        path: "./themes/dracula.json",
      };

      assert.strictEqual(isThemeInfo(validThemeInfo), true);
    });

    test("should return false when missing required properties", () => {
      const testCases = [
        { uiTheme: "vs-dark", path: "./themes/test.json" }, // missing label
        { label: "Test", path: "./themes/test.json" }, // missing uiTheme
        { label: "Test", uiTheme: "vs-dark" }, // missing path
        {}, // missing all properties
      ];

      for (const testCase of testCases) {
        assert.strictEqual(
          isThemeInfo(testCase),
          false,
          `Failed for: ${JSON.stringify(testCase)}`,
        );
      }
    });

    test("should return false when properties have wrong types", () => {
      const testCases = [
        { label: 123, uiTheme: "vs-dark", path: "./themes/test.json" }, // label not string
        { label: "Test", uiTheme: 456, path: "./themes/test.json" }, // uiTheme not string
        { label: "Test", uiTheme: "vs-dark", path: 789 }, // path not string
        {
          id: 123,
          label: "Test",
          uiTheme: "vs-dark",
          path: "./themes/test.json",
        }, // id not string
      ];

      for (const testCase of testCases) {
        assert.strictEqual(
          isThemeInfo(testCase),
          false,
          `Failed for: ${JSON.stringify(testCase)}`,
        );
      }
    });

    test("should return false for null and undefined", () => {
      assert.strictEqual(isThemeInfo(null), false);
      assert.strictEqual(isThemeInfo(undefined), false);
    });

    test("should return false for non-objects", () => {
      assert.strictEqual(isThemeInfo("string"), false);
      assert.strictEqual(isThemeInfo(123), false);
      assert.strictEqual(isThemeInfo([]), false);
      assert.strictEqual(isThemeInfo(true), false);
    });
  });

  suite("isThemeGroupInfo", () => {
    test("should return true for valid ThemeGroupInfo object", () => {
      const validThemes: ThemeInfo[] = [
        {
          label: "Dracula",
          uiTheme: "vs-dark",
          path: "./themes/dracula.json",
        },
        {
          label: "Dracula Soft",
          uiTheme: "vs-dark",
          path: "./themes/dracula-soft.json",
        },
      ];

      const validThemeGroupInfo: ThemeGroupInfo = {
        id: "dracula-theme",
        displayName: "Dracula Official",
        marketplaceUrl:
          "https://marketplace.visualstudio.com/items?itemName=dracula-theme",
        isBuiltin: false,
        themeDir: "/path/to/dracula",
        themes: validThemes,
      };

      assert.strictEqual(isThemeGroupInfo(validThemeGroupInfo), true);
    });

    test("should return false when missing required properties", () => {
      const validThemes: ThemeInfo[] = [
        {
          label: "Test",
          uiTheme: "vs-dark",
          path: "./themes/test.json",
        },
      ];

      const testCases = [
        {
          // missing id
          displayName: "Test",
          marketplaceUrl: "https://example.com",
          isBuiltin: false,
          themeDir: "/path",
          themes: validThemes,
        },
        {
          // missing themeDir
          id: "test",
          displayName: "Test",
          marketplaceUrl: "https://example.com",
          isBuiltin: false,
          themes: validThemes,
        },
        {
          // missing themes
          id: "test",
          displayName: "Test",
          marketplaceUrl: "https://example.com",
          isBuiltin: false,
          themeDir: "/path",
        },
      ];

      for (const testCase of testCases) {
        assert.strictEqual(
          isThemeGroupInfo(testCase),
          false,
          `Failed for: ${JSON.stringify(testCase)}`,
        );
      }
    });

    test("should return false when properties have wrong types", () => {
      const validThemes: ThemeInfo[] = [
        {
          label: "Test",
          uiTheme: "vs-dark",
          path: "./themes/test.json",
        },
      ];

      const testCases = [
        {
          // id not string
          id: 123,
          displayName: "Test",
          marketplaceUrl: "https://example.com",
          isBuiltin: false,
          themeDir: "/path",
          themes: validThemes,
        },
        {
          // themeDir not string
          id: "test",
          displayName: "Test",
          marketplaceUrl: "https://example.com",
          isBuiltin: false,
          themeDir: 456,
          themes: validThemes,
        },
        {
          // themes not array
          id: "test",
          displayName: "Test",
          marketplaceUrl: "https://example.com",
          isBuiltin: false,
          themeDir: "/path",
          themes: "not-array",
        },
      ];

      for (const testCase of testCases) {
        assert.strictEqual(
          isThemeGroupInfo(testCase),
          false,
          `Failed for: ${JSON.stringify(testCase)}`,
        );
      }
    });

    test("should return false when themes array contains invalid ThemeInfo objects", () => {
      const invalidThemes = [
        {
          label: "Valid Theme",
          uiTheme: "vs-dark",
          path: "./themes/valid.json",
        },
        {
          // Invalid theme - missing uiTheme
          label: "Invalid Theme",
          path: "./themes/invalid.json",
        },
      ];

      const themeGroupInfo = {
        id: "test",
        displayName: "Test",
        marketplaceUrl: "https://example.com",
        isBuiltin: false,
        themeDir: "/path",
        themes: invalidThemes,
      };

      assert.strictEqual(isThemeGroupInfo(themeGroupInfo), false);
    });

    test("should return true for empty themes array", () => {
      const themeGroupInfo = {
        id: "test",
        displayName: "Test",
        marketplaceUrl: "https://example.com",
        isBuiltin: false,
        themeDir: "/path",
        themes: [],
      };

      assert.strictEqual(isThemeGroupInfo(themeGroupInfo), true);
    });
  });

  suite("isColorThemeSetting", () => {
    test("should return true for valid ColorThemeSetting object", () => {
      const validColorThemeSetting: ColorThemeSetting = {
        colors: {
          "editor.background": "#1e1e1e",
          "editor.foreground": "#d4d4d4",
        },
      };

      assert.strictEqual(isColorThemeSetting(validColorThemeSetting), true);
    });

    test("should return true for ColorThemeSetting with empty colors object", () => {
      const validColorThemeSetting: ColorThemeSetting = {
        colors: {},
      };

      assert.strictEqual(isColorThemeSetting(validColorThemeSetting), true);
    });

    test("should return true for ColorThemeSetting with additional properties", () => {
      const colorThemeSettingWithExtras = {
        colors: {
          "editor.background": "#1e1e1e",
        },
        tokenColors: [
          {
            name: "Comment",
            scope: ["comment"],
            settings: {
              foreground: "#608b4e",
            },
          },
        ],
        name: "My Theme",
      };

      assert.strictEqual(
        isColorThemeSetting(colorThemeSettingWithExtras),
        true,
      );
    });

    test("should return false when missing colors property", () => {
      const testCases = [{}, { name: "My Theme" }, { tokenColors: [] }];

      for (const testCase of testCases) {
        assert.strictEqual(
          isColorThemeSetting(testCase),
          false,
          `Failed for: ${JSON.stringify(testCase)}`,
        );
      }
    });

    test("should return false when colors is not an object", () => {
      const testCases = [
        { colors: "not-object" },
        { colors: 123 },
        { colors: [] },
        { colors: null },
        { colors: undefined },
        { colors: true },
      ];

      for (const testCase of testCases) {
        assert.strictEqual(
          isColorThemeSetting(testCase),
          false,
          `Failed for: ${JSON.stringify(testCase)}`,
        );
      }
    });

    test("should return false for null and undefined", () => {
      assert.strictEqual(isColorThemeSetting(null), false);
      assert.strictEqual(isColorThemeSetting(undefined), false);
    });

    test("should return false for non-objects", () => {
      assert.strictEqual(isColorThemeSetting("string"), false);
      assert.strictEqual(isColorThemeSetting(123), false);
      assert.strictEqual(isColorThemeSetting([]), false);
      assert.strictEqual(isColorThemeSetting(true), false);
    });
  });
});
