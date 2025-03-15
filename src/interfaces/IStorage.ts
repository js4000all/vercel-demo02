export type StorageKey = { readonly name: string };

export interface IStorageLoader {
    /**
     * Loads the value associated with the specified key.
     * @param key - The key whose associated value is to be loaded.
     * @returns A promise that resolves with the value associated with the key.
     */
    load(key: StorageKey): Promise<string | null>;
}

/**
 * Interface representing a storage mechanism.
 */
export interface IStorage extends IStorageLoader {
    /**
     * Saves a value with the specified key.
     * @param key - The key under which the value should be stored.
     * @param value - The value to be stored.
     * @returns A promise that resolves when the value has been saved.
     */
    save(key: StorageKey, value: string): Promise<void>;

    /**
     * Removes the value associated with the specified key.
     * @param key - The key whose associated value is to be removed.
     * @returns A promise that resolves when the value has been removed.
     */
    remove(key: StorageKey): Promise<void>;
}
