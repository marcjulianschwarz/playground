import { ipcMain } from "electron";
import * as fs from "fs";

ipcMain.on("download", (event, arg) => {
  console.log("Writing to: " + arg.path);
  try {
    fs.writeFileSync(arg.path, arg.data);
  } catch (e) {
    console.log(e);
  }
});

ipcMain.on("save-data", (event, arg) => {
  console.log("Writing data to file: " + arg.path);
  fs.writeFileSync(arg.path, arg.data);
});

ipcMain.handle("get-data", async (event, arg) => {
  const data = fs.readFileSync(arg.path, "utf8");

  return data;
});
