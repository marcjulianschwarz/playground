import { dialog, ipcMain } from "electron";

ipcMain.handle("question", async (event, message, detail) => {
  const result: Electron.MessageBoxReturnValue = await dialog.showMessageBox({
    message: message,
    buttons: ["OK", "Cancel"],
    type: "question",
    detail: detail,
  });
  return result.response == 0;
});

ipcMain.handle("file-selection", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openFile"] });
  return result.filePaths[0];
});
