import * as assert from "assert";
import * as sinon from "sinon";
import {
  TestContext,
  cleanupTestContext,
  createTestContext,
} from "../helpers/test-utils";

// Mock vscode before importing the modules under test
const vscodeStub = {
  workspace: {
    getConfiguration: sinon.stub(),
    workspaceFolders: undefined,
  },
  ConfigurationTarget: {
    Global: 1,
    Workspace: 2,
    WorkspaceFolder: 3,
  },
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

import { getConfigTargets } from "../../src/messageController/getConfigTargets";
import { getCurrentTheme } from "../../src/messageController/getCurrentTheme";
import { updateColorTheme } from "../../src/messageController/updateColorTheme";
import { ConfigTarget } from "../../src/types/ConfigTarget";

suite("messageController", () => {
  let testContext: TestContext;

  setup(() => {
    testContext = createTestContext();
    // Update vscode stub to use our mock
    Object.assign(vscodeStub.workspace, testContext.vscode.workspace);
  });

  teardown(() => {
    cleanupTestContext(testContext);
    vscodeStub.workspace.getConfiguration.reset();
  });

  suite("getCurrentTheme", () => {
    test("should return user global theme when target is user", () => {
      const mockConfig = {
        inspect: testContext.sandbox.stub().returns({
          globalValue: "Dracula",
          workspaceValue: "Light Theme",
        }),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      const result = getCurrentTheme(ConfigTarget.User);

      assert.strictEqual(result, "Dracula");
      assert.ok(vscodeStub.workspace.getConfiguration.calledWith("workbench"));
      assert.ok(mockConfig.inspect.calledWith("colorTheme"));
    });

    test("should return workspace theme when target is workspace", () => {
      const mockConfig = {
        inspect: testContext.sandbox.stub().returns({
          globalValue: "Dracula",
          workspaceValue: "Light Theme",
        }),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      const result = getCurrentTheme(ConfigTarget.Workspace);

      assert.strictEqual(result, "Light Theme");
      assert.ok(vscodeStub.workspace.getConfiguration.calledWith("workbench"));
      assert.ok(mockConfig.inspect.calledWith("colorTheme"));
    });

    test("should return empty string when globalValue is undefined for user target", () => {
      const mockConfig = {
        inspect: testContext.sandbox.stub().returns({
          globalValue: undefined,
          workspaceValue: "Light Theme",
        }),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      const result = getCurrentTheme(ConfigTarget.User);

      assert.strictEqual(result, "");
    });

    test("should return empty string when workspaceValue is undefined for workspace target", () => {
      const mockConfig = {
        inspect: testContext.sandbox.stub().returns({
          globalValue: "Dracula",
          workspaceValue: undefined,
        }),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      const result = getCurrentTheme(ConfigTarget.Workspace);

      assert.strictEqual(result, "");
    });

    test("should handle null values from inspect", () => {
      const mockConfig = {
        inspect: testContext.sandbox.stub().returns({
          globalValue: null,
          workspaceValue: null,
        }),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      const userResult = getCurrentTheme(ConfigTarget.User);
      const workspaceResult = getCurrentTheme(ConfigTarget.Workspace);

      assert.strictEqual(userResult, "");
      assert.strictEqual(workspaceResult, "");
    });

    test("should handle undefined colorTheme inspection result", () => {
      const mockConfig = {
        inspect: testContext.sandbox.stub().returns(undefined),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      const result = getCurrentTheme(ConfigTarget.User);

      assert.strictEqual(result, "");
    });
  });

  suite("getConfigTargets", () => {
    test("should return workspace folders as config targets", () => {
      const mockWorkspaceFolders = [
        { name: "project-1", index: 0 },
        { name: "project-2", index: 1 },
        { name: "nested-project", index: 2 },
      ];

      vscodeStub.workspace.workspaceFolders = mockWorkspaceFolders;

      const result = getConfigTargets();

      assert.strictEqual(result.length, 3);
      assert.deepStrictEqual(result, [
        { name: "project-1", index: 0 },
        { name: "project-2", index: 1 },
        { name: "nested-project", index: 2 },
      ]);
    });

    test("should return empty array when no workspace folders", () => {
      vscodeStub.workspace.workspaceFolders = undefined;

      const result = getConfigTargets();

      assert.strictEqual(result.length, 0);
      assert.deepStrictEqual(result, []);
    });

    test("should return empty array when workspaceFolders is null", () => {
      vscodeStub.workspace.workspaceFolders = null;

      const result = getConfigTargets();

      assert.strictEqual(result.length, 0);
      assert.deepStrictEqual(result, []);
    });

    test("should handle empty workspaceFolders array", () => {
      vscodeStub.workspace.workspaceFolders = [];

      const result = getConfigTargets();

      assert.strictEqual(result.length, 0);
      assert.deepStrictEqual(result, []);
    });

    test("should extract only name and index from workspace folders", () => {
      const mockWorkspaceFolders = [
        {
          name: "my-project",
          index: 0,
          uri: { fsPath: "/path/to/project" },
          extraProperty: "should-be-ignored",
        },
      ];

      vscodeStub.workspace.workspaceFolders = mockWorkspaceFolders;

      const result = getConfigTargets();

      assert.strictEqual(result.length, 1);
      assert.deepStrictEqual(result[0], { name: "my-project", index: 0 });
      assert.ok(!("uri" in result[0]));
      assert.ok(!("extraProperty" in result[0]));
    });
  });

  suite("updateColorTheme", () => {
    test("should update global configuration for user target", async () => {
      const mockConfig = {
        update: testContext.sandbox.stub().resolves(),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      await updateColorTheme("Dracula", ConfigTarget.User);

      assert.ok(vscodeStub.workspace.getConfiguration.called);
      assert.ok(
        mockConfig.update.calledWith(
          "workbench.colorTheme",
          "Dracula",
          vscodeStub.ConfigurationTarget.Global,
        ),
      );
    });

    test("should update workspace configuration for workspace target", async () => {
      const mockConfig = {
        update: testContext.sandbox.stub().resolves(),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      await updateColorTheme("Light Theme", ConfigTarget.Workspace);

      assert.ok(vscodeStub.workspace.getConfiguration.called);
      assert.ok(
        mockConfig.update.calledWith(
          "workbench.colorTheme",
          "Light Theme",
          vscodeStub.ConfigurationTarget.Workspace,
        ),
      );
    });

    test("should throw error for invalid target", async () => {
      try {
        await updateColorTheme("Some Theme", "invalid-target" as any);
        assert.fail("Expected error to be thrown");
      } catch (error) {
        assert.ok(error instanceof Error);
      }
    });

    test("should handle configuration update errors", async () => {
      const mockConfig = {
        update: testContext.sandbox
          .stub()
          .rejects(new Error("Configuration update failed")),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      try {
        await updateColorTheme("Dracula", ConfigTarget.User);
        assert.fail("Expected error to be thrown");
      } catch (error) {
        assert.strictEqual(
          (error as Error).message,
          "Configuration update failed",
        );
      }
    });

    test("should handle empty theme label", async () => {
      const mockConfig = {
        update: testContext.sandbox.stub().resolves(),
      };
      vscodeStub.workspace.getConfiguration.returns(mockConfig);

      await updateColorTheme("", ConfigTarget.User);

      assert.ok(
        mockConfig.update.calledWith(
          "workbench.colorTheme",
          "",
          vscodeStub.ConfigurationTarget.Global,
        ),
      );
    });
  });
});
