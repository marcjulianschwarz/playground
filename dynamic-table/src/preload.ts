// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    on: (channel: string, listener: (...args: any[]) => void) => {
      ipcRenderer.on(channel, listener);
    },
    send: (channel: string, ...args: any) => {
      ipcRenderer.send(channel, ...args);
    },
    once: (channel: string, listener: (...args: any[]) => void) => {
      ipcRenderer.once(channel, listener);
    },
    invoke: (channel: string, ...args: any[]) => {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
});

contextBridge.exposeInMainWorld("tableAPI", {
  alert: {
    question: (message: string, detail: string) => {
      return ipcRenderer.invoke("question", message, detail);
    },
    fileSelection: () => {
      return ipcRenderer.invoke("file-selection");
    },
  },
});
