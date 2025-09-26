import * as sinon from "sinon";
import { VSCodeMock, createVSCodeMock } from "../mocks/vscode";

export interface TestContext {
  vscode: VSCodeMock;
  sandbox: sinon.SinonSandbox;
}

export const createTestContext = (): TestContext => {
  return {
    vscode: createVSCodeMock(),
    sandbox: sinon.createSandbox(),
  };
};

export const cleanupTestContext = (context: TestContext): void => {
  context.vscode.reset();
  context.sandbox.restore();
};

export const mockFileSystem = (
  sandbox: sinon.SinonSandbox,
  files: Record<string, string>,
) => {
  const fs = require("fs");

  const readFileSyncStub = sandbox.stub(fs, "readFileSync");
  const existsSyncStub = sandbox.stub(fs, "existsSync");

  for (const [filePath, content] of Object.entries(files)) {
    readFileSyncStub.withArgs(filePath, "utf-8").returns(content);
    existsSyncStub.withArgs(filePath).returns(true);
  }

  // Return false for any other paths
  existsSyncStub.callsFake((path: string) => {
    return Object.keys(files).includes(path);
  });

  return { readFileSyncStub, existsSyncStub };
};

export const expectThrowsAsync = async (
  fn: () => Promise<any>,
  expectedError?: string | RegExp,
): Promise<Error> => {
  try {
    await fn();
    throw new Error("Expected function to throw, but it did not");
  } catch (error) {
    if (expectedError) {
      if (typeof expectedError === "string") {
        if (
          !(error instanceof Error) ||
          !error.message.includes(expectedError)
        ) {
          throw new Error(
            `Expected error message to contain "${expectedError}", but got: ${error}`,
          );
        }
      } else if (expectedError instanceof RegExp) {
        if (!(error instanceof Error) || !expectedError.test(error.message)) {
          throw new Error(
            `Expected error message to match ${expectedError}, but got: ${error}`,
          );
        }
      }
    }
    return error as Error;
  }
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const assertDeepEqual = (
  actual: any,
  expected: any,
  message?: string,
): void => {
  const actualStr = JSON.stringify(actual, null, 2);
  const expectedStr = JSON.stringify(expected, null, 2);

  if (actualStr !== expectedStr) {
    const errorMessage = message
      ? `${message}\nActual: ${actualStr}\nExpected: ${expectedStr}`
      : `Objects are not deeply equal\nActual: ${actualStr}\nExpected: ${expectedStr}`;
    throw new Error(errorMessage);
  }
};
