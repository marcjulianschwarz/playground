"use client";
import React, { useState } from "react";
import { upload, download } from "@/app/api/data-sharing";

export default function Home() {
  const [uploadContent, setUploadContent] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadedContent, setDownloadedContent] = useState("");

  const handleUpload = async () => {
    try {
      const url = await upload(uploadContent);
      setUploadedUrl(url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const handleDownload = async () => {
    try {
      const content = await download(downloadUrl);
      setDownloadedContent(JSON.stringify(content, null, 2));
    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Please check the URL and try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Secure Upload and Download</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Upload</h2>
        <textarea
          value={uploadContent}
          onChange={(e) => setUploadContent(e.target.value)}
          placeholder="Enter content to upload"
          rows={4}
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button onClick={handleUpload}>Upload</button>
        {uploadedUrl && (
          <div>
            <p>Uploaded URL:</p>
            <input
              type="text"
              value={uploadedUrl}
              readOnly
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>

      <div>
        <h2>Download</h2>
        <input
          type="text"
          value={downloadUrl}
          onChange={(e) => setDownloadUrl(e.target.value)}
          placeholder="Enter URL to download"
          style={{ width: "100%", marginBottom: "10px" }}
        />
        <button onClick={handleDownload}>Download</button>
        {downloadedContent && (
          <div>
            <p>Downloaded Content:</p>
            <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
              {downloadedContent}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
