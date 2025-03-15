import { StorageKey, IStorage } from "@/interfaces";

class VercelBlobStorage implements IStorage {
  async save(key: StorageKey, value: string): Promise<void> {
    const body = JSON.stringify({ key: key.name, value });
    console.log("body: ", body);
    await fetch("/api/save-blob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
  }

  async load(key: StorageKey): Promise<string | null> {
    const res = await fetch("/api/head-blob?key=" + key.name);
    const { url } = await res.json();
    const downloadUrl = `${url}?ts=${Date.now()}`;
    console.log("downloadUrl: ", downloadUrl);
    const response = await fetch(downloadUrl);
    console.log("response: ", response);
    const value = await response.text();
    console.log("downloaded value:", value);
    return value;
  }

  async remove(key: StorageKey): Promise<void> {
    await fetch("/api/delete-blob?key=" + key.name);
  }
}

export default VercelBlobStorage;
