declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on: (channel: string, listener: (...args: any[]) => void) => void;
        send: (channel: string, ...args: any[]) => void;
        once: (channel: string, listener: (...args: any[]) => void) => void;
        invoke: (channel: string, ...args: any[]) => Promise<any>;
      };
    };
    tableAPI: {
      alert: {
        question: (message: string, detail: string) => Promise<boolean>;
        fileSelection: () => Promise<string>;
      };
    };
  }
}
export {};
