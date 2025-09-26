import * as assert from "assert";
import * as vscode from "vscode";
import * as myExtension from "../extension";

suite("Extension Integration Test Suite", () => {
  vscode.window.showInformationMessage("Start integration tests.");

  test("Extension should be present", () => {
    const extension = vscode.extensions.getExtension("your-themes");
    assert.ok(extension, "Extension should be available in the extension list");
  });

  test("Should register your-themes.openViewer command", async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(
      commands.includes("your-themes.openViewer"),
      "Command 'your-themes.openViewer' should be registered",
    );
  });

  test("Activate function should be available", () => {
    assert.ok(
      typeof myExtension.activate === "function",
      "activate function should exist",
    );
    assert.ok(
      typeof myExtension.deactivate === "function",
      "deactivate function should exist",
    );
  });

  test("Extension activation should work", async () => {
    const extension = vscode.extensions.getExtension("your-themes");
    if (extension && !extension.isActive) {
      await extension.activate();
    }
    assert.ok(
      extension?.isActive,
      "Extension should be active after activation",
    );
  });

  test("Command execution should not throw error", async () => {
    try {
      // This might create a webview panel, which is expected behavior
      await vscode.commands.executeCommand("your-themes.openViewer");
      // If we reach here, the command executed without throwing an error
      assert.ok(true, "Command executed successfully");
    } catch (error) {
      // Command execution should not throw critical errors
      assert.fail(`Command execution failed: ${error}`);
    }
  });
});
