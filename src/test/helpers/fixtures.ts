import * as fs from "fs";
import * as path from "path";
import { MockExtension } from "../mocks/vscode";

export interface ThemeFixture {
  id: string;
  name: string;
  path: string;
  content: any;
}

export interface ExtensionFixture {
  id: string;
  displayName: string;
  extensionPath: string;
  themes: ThemeFixture[];
  isBuiltin?: boolean;
}

export const loadThemeFixtures = (
  fixturesDir: string = "tests/fixtures/themes",
): ExtensionFixture[] => {
  const fixtures: ExtensionFixture[] = [];

  if (!fs.existsSync(fixturesDir)) {
    console.warn(`Fixtures directory not found: ${fixturesDir}`);
    return fixtures;
  }

  const extensionDirs = fs.readdirSync(fixturesDir);

  for (const extensionId of extensionDirs) {
    const extensionPath = path.join(fixturesDir, extensionId);

    if (!fs.statSync(extensionPath).isDirectory()) {
      continue;
    }

    const themes: ThemeFixture[] = [];
    const themeFiles = fs
      .readdirSync(extensionPath)
      .filter((f) => f.endsWith(".json"));

    for (const themeFile of themeFiles) {
      const themePath = path.join(extensionPath, themeFile);
      const themeName = path.basename(themeFile, ".json");

      try {
        const content = JSON.parse(fs.readFileSync(themePath, "utf-8"));
        themes.push({
          id: `${extensionId}.${themeName}`,
          name: themeName,
          path: themePath,
          content,
        });
      } catch (error) {
        console.warn(`Failed to load theme fixture: ${themePath}`, error);
      }
    }

    fixtures.push({
      id: extensionId,
      displayName: extensionId.charAt(0).toUpperCase() + extensionId.slice(1),
      extensionPath,
      themes,
      isBuiltin: false,
    });
  }

  return fixtures;
};

export const createMockExtensions = (
  fixtures: ExtensionFixture[],
): MockExtension[] => {
  return fixtures.map((fixture) => ({
    id: fixture.id,
    extensionPath: fixture.extensionPath,
    packageJSON: {
      name: fixture.id,
      displayName: fixture.displayName,
      categories: ["Themes"],
      isBuiltin: fixture.isBuiltin || false,
      contributes: {
        themes: fixture.themes.map((theme) => ({
          label: theme.name,
          uiTheme: theme.content.type || "vs-dark",
          path: theme.path,
        })),
      },
    },
    isActive: true,
  }));
};

export const createSampleThemeContent = (type: "dark" | "light" = "dark") => ({
  name: "Sample Theme",
  type,
  colors: {
    "editor.background": type === "dark" ? "#1e1e1e" : "#ffffff",
    "editor.foreground": type === "dark" ? "#d4d4d4" : "#000000",
  },
  tokenColors: [
    {
      name: "Comment",
      scope: ["comment"],
      settings: {
        foreground: type === "dark" ? "#608b4e" : "#008000",
      },
    },
  ],
});

export const createSampleExtensionPackageJSON = (
  id: string,
  themes: string[] = ["theme1"],
) => ({
  name: id,
  displayName: `${id} Extension`,
  version: "1.0.0",
  categories: ["Themes"],
  contributes: {
    themes: themes.map((themeName) => ({
      label: themeName,
      uiTheme: "vs-dark",
      path: `./themes/${themeName}.json`,
    })),
  },
});

export const getTestFixturesPath = (): string => {
  return path.resolve(__dirname, "../fixtures");
};

export const cleanupTestFiles = (testDir: string): void => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
};
