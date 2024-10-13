// Inspired by / Copied from
// https://blog.excalidraw.com/end-to-end-encryption/

export async function upload(content: string) {
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    new TextEncoder().encode(content)
  );

  // Combine IV and encrypted data
  const combinedData = new Uint8Array(
    iv.length + new Uint8Array(encrypted).length
  );
  combinedData.set(iv);
  combinedData.set(new Uint8Array(encrypted), iv.length);

  // Convert combinedData to Base64
  const base64Data = btoa(
    Array.from(combinedData, (byte) => String.fromCharCode(byte)).join("")
  );

  const response = await fetch("http://localhost:3001/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      data: base64Data,
      id: crypto.randomUUID(),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log(data);

  const objectURL = `http://localhost:3001/download?id=${data.id}`;
  const objectKey = await window.crypto.subtle.exportKey("raw", key);
  const base64Key = btoa(
    Array.from(new Uint8Array(objectKey), (byte) =>
      String.fromCharCode(byte)
    ).join("")
  );
  const url = `${objectURL}#key=${base64Key}`;
  return url;
}

export async function download(url: string) {
  const [objectURL, base64Key] = url.split("#key=");
  const id = new URL(objectURL).searchParams.get("id");

  if (!id) {
    throw new Error("Invalid URL: missing id parameter");
  }

  const response = await fetch(`http://localhost:3001/download?id=${id}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const base64Data = await response.text();
  const combinedData = new Uint8Array(
    atob(base64Data)
      .split("")
      .map((char) => char.charCodeAt(0))
  );

  // Extract IV and encrypted data
  const iv = combinedData.slice(0, 12);
  const encrypted = combinedData.slice(12);

  const keyData = new Uint8Array(
    atob(base64Key)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const key = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encrypted
  );

  const content = new TextDecoder().decode(new Uint8Array(decrypted));
  return content;
}
