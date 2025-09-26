import { EventEmitter } from "events";

export interface MockExtension {
  id: string;
  extensionPath: string;
  packageJSON: any;
  isActive?: boolean;
}

export interface MockConfiguration {
  get<T>(section: string, defaultValue?: T): T | undefined;
  update(section: string, value: any, configurationTarget?: any): Promise<void>;
}

export interface MockWebviewPanel {
  webview: {
    html: string;
    asWebviewUri: (uri: any) => any;
    postMessage: (message: any) => void;
    onDidReceiveMessage: (handler: (message: any) => void) => void;
  };
  viewColumn: any;
  reveal: (column?: any) => void;
  onDidDispose: (handler: () => void) => void;
  dispose: () => void;
}

export class VSCodeMock {
  private extensions: MockExtension[] = [];
  private configuration: Map<string, any> = new Map();
  private commands: Map<string, Function> = new Map();
  private eventEmitter = new EventEmitter();

  // Extensions API mock
  get extensions() {
    return {
      all: this.extensions,
      getExtension: (id: string) =>
        this.extensions.find((ext) => ext.id === id),
    };
  }

  setExtensions(extensions: MockExtension[]) {
    this.extensions = extensions;
  }

  // Workspace API mock
  get workspace() {
    return {
      getConfiguration: (section?: string) => ({
        get: <T>(key: string, defaultValue?: T): T | undefined => {
          const fullKey = section ? `${section}.${key}` : key;
          return this.configuration.get(fullKey) ?? defaultValue;
        },
        update: async (key: string, value: any) => {
          const fullKey = section ? `${section}.${key}` : key;
          this.configuration.set(fullKey, value);
        },
      }),
    };
  }

  setConfiguration(key: string, value: any) {
    this.configuration.set(key, value);
  }

  // Commands API mock
  get commands() {
    return {
      registerCommand: (command: string, callback: Function) => {
        this.commands.set(command, callback);
        return { dispose: () => this.commands.delete(command) };
      },
      executeCommand: async (command: string, ...args: any[]) => {
        const handler = this.commands.get(command);
        if (handler) {
          return await handler(...args);
        }
        throw new Error(`Command '${command}' not found`);
      },
      getCommands: async (filterInternal?: boolean) => {
        return Array.from(this.commands.keys());
      },
    };
  }

  // Window API mock
  get window() {
    return {
      showInformationMessage: (message: string) => {
        console.log(`INFO: ${message}`);
        return Promise.resolve();
      },
      showErrorMessage: (message: string) => {
        console.error(`ERROR: ${message}`);
        return Promise.resolve();
      },
      createWebviewPanel: (
        viewType: string,
        title: string,
        showOptions: any,
        options?: any,
      ): MockWebviewPanel => {
        const panel: MockWebviewPanel = {
          webview: {
            html: "",
            asWebviewUri: (uri: any) => uri,
            postMessage: (message: any) => {
              this.eventEmitter.emit("webview-message", message);
            },
            onDidReceiveMessage: (handler: (message: any) => void) => {
              this.eventEmitter.on("webview-receive", handler);
            },
          },
          viewColumn: showOptions.viewColumn,
          reveal: (column?: any) => {
            console.log(
              `Panel revealed in column: ${column || this.viewColumn}`,
            );
          },
          onDidDispose: (handler: () => void) => {
            this.eventEmitter.on("panel-dispose", handler);
          },
          dispose: () => {
            this.eventEmitter.emit("panel-dispose");
          },
        };
        return panel;
      },
    };
  }

  // Uri API mock
  get Uri() {
    return {
      joinPath: (...paths: any[]) => ({
        fsPath: paths.join("/"),
        toString: () => paths.join("/"),
      }),
      file: (path: string) => ({
        fsPath: path,
        toString: () => path,
      }),
    };
  }

  // ViewColumn enum mock
  get ViewColumn() {
    return {
      Active: -1,
      Beside: -2,
      One: 1,
      Two: 2,
      Three: 3,
    };
  }

  // Reset mock state
  reset() {
    this.extensions = [];
    this.configuration.clear();
    this.commands.clear();
    this.eventEmitter.removeAllListeners();
  }

  // Helper methods for testing
  simulateWebviewMessage(message: any) {
    this.eventEmitter.emit("webview-receive", message);
  }

  simulatePanelDispose() {
    this.eventEmitter.emit("panel-dispose");
  }
}

export const createVSCodeMock = (): VSCodeMock => new VSCodeMock();
