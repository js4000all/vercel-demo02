import { put, head, del } from "@vercel/blob";
import { StorageKey, IStorage } from "@/interfaces";

class VercelBlobStorage implements IStorage {
  async save(key: StorageKey, value: string): Promise<void> {
    console.log("VercelBlobStorage.save", key, value);
    const result = await put(key.name, value, {
        access: "public",
        addRandomSuffix: false,
    });
    console.log("VercelBlobStorage.save", key, result);
  }

  async load(key: StorageKey): Promise<string> {
    console.log("VercelBlobStorage.load", key);
    const { downloadUrl } = await head(key.name);
    console.log("VercelBlobStorage.load", key, downloadUrl);
    const response = await fetch(downloadUrl);
    console.log("VercelBlobStorage.load", key, downloadUrl, response);
    return response.text();
  }

  async remove(key: StorageKey): Promise<void> {
    console.log("VercelBlobStorage.remove", key);
    await del(key.name);
    console.log("VercelBlobStorage.remove done", key);
  }
}

export default VercelBlobStorage;
