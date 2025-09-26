import * as assert from "assert";
import { createSampleThemeContent } from "../helpers/fixtures";
import {
  TestContext,
  cleanupTestContext,
  createTestContext,
  mockFileSystem,
} from "../helpers/test-utils";

// Mock vscode before importing the module under test
const vscodeStub = {
  extensions: { all: [] },
  window: {},
  workspace: {},
  commands: {},
  Uri: {},
};

// Override module resolution for vscode
require.cache[require.resolve("vscode")] = {
  id: "vscode",
  filename: "vscode",
  loaded: true,
  parent: null,
  children: [],
  paths: [],
  exports: vscodeStub,
};

import {
  getColorSetting,
  getThemeExtensionList,
  getThemeInfoList,
} from "../../theme-extension";

suite("theme-extension.ts", () => {
  let testContext: TestContext;

  setup(() => {
    testContext = createTestContext();
    // Update vscode stub to use our mock
    Object.assign(vscodeStub, testContext.vscode);
  });

  teardown(() => {
    cleanupTestContext(testContext);
  });

  suite("getThemeExtensionList", () => {
    test("should return only extensions with Themes category", () => {
      const mockExtensions = [
        {
          id: "theme-extension-1",
          packageJSON: {
            categories: ["Themes"],
          },
        },
        {
          id: "regular-extension",
          packageJSON: {
            categories: ["Other"],
          },
        },
        {
          id: "theme-extension-2",
          packageJSON: {
            categories: ["Themes", "Other"],
          },
        },
        {
          id: "no-category-extension",
          packageJSON: {},
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeExtensions = getThemeExtensionList();

      assert.strictEqual(themeExtensions.length, 2);
      assert.strictEqual(themeExtensions[0].id, "theme-extension-1");
      assert.strictEqual(themeExtensions[1].id, "theme-extension-2");
    });

    test("should return empty array when no theme extensions found", () => {
      const mockExtensions = [
        {
          id: "regular-extension",
          packageJSON: {
            categories: ["Other"],
          },
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeExtensions = getThemeExtensionList();

      assert.strictEqual(themeExtensions.length, 0);
    });

    test("should handle extensions without categories property", () => {
      const mockExtensions = [
        {
          id: "no-categories",
          packageJSON: {},
        },
        {
          id: "null-categories",
          packageJSON: {
            categories: null,
          },
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeExtensions = getThemeExtensionList();

      assert.strictEqual(themeExtensions.length, 0);
    });
  });

  suite("getThemeInfoList", () => {
    test("should return theme group info for valid theme extensions", () => {
      const mockExtensions = [
        {
          id: "dracula-theme",
          extensionPath: "/path/to/dracula",
          packageJSON: {
            displayName: "Dracula Official",
            categories: ["Themes"],
            contributes: {
              themes: [
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
              ],
            },
          },
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeGroupInfo = getThemeInfoList();

      assert.strictEqual(themeGroupInfo.length, 1);

      const group = themeGroupInfo[0];
      assert.strictEqual(group.id, "dracula-theme");
      assert.strictEqual(group.displayName, "Dracula Official");
      assert.strictEqual(
        group.marketplaceUrl,
        "https://marketplace.visualstudio.com/items?itemName=dracula-theme",
      );
      assert.strictEqual(group.isBuiltin, false);
      assert.strictEqual(group.themeDir, "/path/to/dracula");
      assert.strictEqual(group.themes.length, 2);

      const theme1 = group.themes[0];
      assert.strictEqual(theme1.label, "Dracula");
      assert.strictEqual(theme1.uiTheme, "vs-dark");
      assert.strictEqual(theme1.path, "./themes/dracula.json");
    });

    test("should handle builtin themes", () => {
      const mockExtensions = [
        {
          id: "vscode-theme-defaults",
          extensionPath: "/builtin/themes",
          packageJSON: {
            displayName: "Default Themes",
            categories: ["Themes"],
            isBuiltin: true,
            contributes: {
              themes: [
                {
                  label: "Dark+ (default dark)",
                  uiTheme: "vs-dark",
                  path: "./themes/dark_plus.json",
                },
              ],
            },
          },
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeGroupInfo = getThemeInfoList();

      assert.strictEqual(themeGroupInfo.length, 1);
      assert.strictEqual(themeGroupInfo[0].isBuiltin, true);
    });

    test("should skip extensions without themes", () => {
      const mockExtensions = [
        {
          id: "invalid-theme-extension",
          extensionPath: "/path/to/invalid",
          packageJSON: {
            categories: ["Themes"],
            // No contributes.themes
          },
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeGroupInfo = getThemeInfoList();

      assert.strictEqual(themeGroupInfo.length, 0);
    });

    test("should filter out invalid theme objects", () => {
      const mockExtensions = [
        {
          id: "mixed-theme-extension",
          extensionPath: "/path/to/mixed",
          packageJSON: {
            categories: ["Themes"],
            contributes: {
              themes: [
                {
                  label: "Valid Theme",
                  uiTheme: "vs-dark",
                  path: "./themes/valid.json",
                },
                {
                  // Missing required properties
                  label: "Invalid Theme",
                },
                {
                  label: "Another Valid Theme",
                  uiTheme: "vs-light",
                  path: "./themes/valid-light.json",
                },
              ],
            },
          },
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeGroupInfo = getThemeInfoList();

      assert.strictEqual(themeGroupInfo.length, 1);
      assert.strictEqual(themeGroupInfo[0].themes.length, 2);
      assert.strictEqual(themeGroupInfo[0].themes[0].label, "Valid Theme");
      assert.strictEqual(
        themeGroupInfo[0].themes[1].label,
        "Another Valid Theme",
      );
    });

    test("should use extension id as displayName when displayName is missing", () => {
      const mockExtensions = [
        {
          id: "no-display-name",
          extensionPath: "/path/to/extension",
          packageJSON: {
            categories: ["Themes"],
            contributes: {
              themes: [
                {
                  label: "Test Theme",
                  uiTheme: "vs-dark",
                  path: "./themes/test.json",
                },
              ],
            },
          },
        },
      ];

      testContext.vscode.setExtensions(mockExtensions as any);

      const themeGroupInfo = getThemeInfoList();

      assert.strictEqual(themeGroupInfo.length, 1);
      assert.strictEqual(themeGroupInfo[0].displayName, "no-display-name");
    });
  });

  suite("getColorSetting", () => {
    test("should parse valid color theme setting", async () => {
      const sampleTheme = createSampleThemeContent("dark");
      const mockFiles = {
        "/path/to/theme.json": JSON.stringify(sampleTheme),
      };

      mockFileSystem(testContext.sandbox, mockFiles);

      const colorSetting = await getColorSetting("/path/to/theme.json");

      assert.ok(colorSetting);
      assert.deepStrictEqual(colorSetting.colors, sampleTheme.colors);
    });

    test("should return null for invalid theme file", async () => {
      const invalidTheme = { invalidProperty: "value" };
      const mockFiles = {
        "/path/to/invalid.json": JSON.stringify(invalidTheme),
      };

      mockFileSystem(testContext.sandbox, mockFiles);

      const colorSetting = await getColorSetting("/path/to/invalid.json");

      assert.strictEqual(colorSetting, null);
    });

    test("should handle JSON parsing errors", async () => {
      const mockFiles = {
        "/path/to/malformed.json": "{ invalid json",
      };

      mockFileSystem(testContext.sandbox, mockFiles);

      try {
        await getColorSetting("/path/to/malformed.json");
        assert.fail("Expected JSON parsing error");
      } catch (error) {
        assert.ok(error instanceof SyntaxError);
      }
    });

    test("should handle file read errors", async () => {
      const fs = require("fs");
      testContext.sandbox
        .stub(fs, "readFileSync")
        .throws(new Error("File not found"));

      try {
        await getColorSetting("/path/to/nonexistent.json");
        assert.fail("Expected file read error");
      } catch (error) {
        assert.strictEqual((error as Error).message, "File not found");
      }
    });
  });
});
