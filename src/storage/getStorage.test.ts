import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getStorage } from './getStorage';
import LocalStorage from './LocalStorage';
import VercelBlobStorage from './VercelBlobStorage';
import * as env from '@/utils/env';

// isProduction 関数をモック
vi.mock('@/utils/env', () => ({
    isProduction: vi.fn()
}));

describe('getStorage', () => {
    beforeEach(() => {
        // テスト前にモックをリセット
        vi.resetAllMocks();
    });

    it('本番環境では VercelBlobStorage を返す', () => {
        // isProduction を true に設定
        vi.mocked(env.isProduction).mockReturnValue(true);

        const storage = getStorage();
        expect(storage).toBeInstanceOf(VercelBlobStorage);
    });

    it('開発環境では LocalStorage を返す', () => {
        // isProduction を false に設定
        vi.mocked(env.isProduction).mockReturnValue(false);

        const storage = getStorage();
        expect(storage).toBeInstanceOf(LocalStorage);
    });
}); 
