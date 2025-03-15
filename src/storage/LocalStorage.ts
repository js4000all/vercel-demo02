import { StorageKey, IStorage } from '@/interfaces';

class LocalStorage implements IStorage {
    async save(key: StorageKey, value: string): Promise<void> {
        localStorage.setItem(key.name, value);
    }
    async remove(key: StorageKey): Promise<void> {
        localStorage.removeItem(key.name);
    }
    async load(key: StorageKey): Promise<string | null> {
        return localStorage.getItem(key.name);
    }
}

export default LocalStorage;
