/**
 * 現在の環境が本番環境かどうかを判定する
 * 
 * Vercel上で実行される場合、Viteは自動的に以下の環境変数を設定します：
 * - import.meta.env.VITE_VERCEL_ENV: 'development' | 'preview' | 'production'
 * 
 * 本番環境（production）では、この値が'production'になります。
 * 開発環境やプレビュー環境では、それぞれ'development'または'preview'になります。
 * 
 * @returns 本番環境の場合は true、それ以外の場合は false
 */
export function isProduction(): boolean {
    return import.meta.env.VITE_VERCEL_ENV === 'production';
} 
