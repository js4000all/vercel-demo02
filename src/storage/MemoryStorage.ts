import { StorageKey, IStorage } from "@/interfaces";

class MemoryStorage implements IStorage {
  private storage: Map<string, string> = new Map();

  async load(key: StorageKey): Promise<string | null> {
    return this.storage.get(key.name) ?? null;
  }

  async save(key: StorageKey, value: string): Promise<void> {
    this.storage.set(key.name, value);
  }

  async remove(key: StorageKey): Promise<void> {
    this.storage.delete(key.name);
  }
}

export default MemoryStorage;
