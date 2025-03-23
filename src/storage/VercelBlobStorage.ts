import { StorageKey, IStorage } from "@/interfaces";

class VercelBlobStorage implements IStorage {
  async save(key: StorageKey, value: string): Promise<void> {
    const body = JSON.stringify({ key: key.name, value });
    await fetch("/api/save-blob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
  }

  async load(key: StorageKey): Promise<string | null> {
    const res = await fetch("/api/head-blob?key=" + key.name);
    const { url } = await res.json();
    const response = await fetch(url);
    return response.text();
  }

  async remove(key: StorageKey): Promise<void> {
    await fetch("/api/delete-blob?key=" + key.name);
  }
}

export default VercelBlobStorage;
