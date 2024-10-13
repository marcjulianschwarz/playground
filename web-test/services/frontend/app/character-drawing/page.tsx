"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function CharacterDrawing() {
  const width = 50;
  const height = 50;

  const initialCanvas: string[][] = [];

  for (let i = 0; i < width; i += 1) {
    initialCanvas.push([]);
    for (let j = 0; j < height; j += 1) {
      initialCanvas[i].push("");
    }
  }

  const [canvas, setCanvas] = useState<string[][]>(initialCanvas);

  return (
    <div className={styles.canvas}>
      {canvas.map((row, idx) => (
        <div className={styles.row} key={idx}>
          {row.map((val, idx2) => (
            <div key={idx2 + "_" + idx} className={styles.valueBox}>
              <p className={styles.value}>{val}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
