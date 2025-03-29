import { IStorage } from '@/interfaces';
import LocalStorage from './LocalStorage';
import VercelBlobStorage from './VercelBlobStorage';
import { isProduction } from '@/utils/env';

/**
 * 環境に応じて適切なストレージ実装を返す
 * @returns IStorage の実装インスタンス
 */
export function getStorage(): IStorage {
  // 本番環境では VercelBlobStorage を使用
  if (isProduction()) {
    return new VercelBlobStorage();
  }

  // それ以外（development, preview）では LocalStorage を使用
  return new LocalStorage();
} 
