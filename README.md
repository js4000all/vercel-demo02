# vercel-demo02
Simple TODO app


# 開発者向けメモ

## ローカル開発環境のセットアップ

このプロジェクトは、`npm start` を使用してローカルで開発・デバッグが可能です。

### 必要な環境
- Node.js (`v21.7` 以上)
- npm または yarn

### 開発環境のセットアップ
1. リポジトリをクローン
   ```sh
   git clone https://github.com/js4000all/vercel-demo02.git
   cd vercel-demo02
   ```
2. 依存関係をインストール
   ```sh
   npm install
   ```
3. ローカルサーバーを起動
   ```sh
   npm start
   ```
   - ブラウザで `http://localhost:3000` にアクセス
   - 開発用のホットリロードが有効

### テストの実行
このプロジェクトでは、Jest + React Testing Library を使用してユニットテストを記述しています。
```sh
npm test
```
- `setupTests.js` により、`localStorage`のクリーニングなどを行なっています。
- デフォルトでは、変更を監視しながらテストが実行されます。

### 環境変数の設定（必要な場合）
- `.env.local` を作成し、環境変数を設定できます。
- 環境変数の詳細については [環境変数の管理](./docs/env-setup.md) を参照してください。

---

## ✅ ローカル開発時の注意点
- `npm start` を実行すると、**自動的にブラウザが開かない場合があります**。手動で `http://localhost:3000` にアクセスしてください。
- 依存関係の問題が発生した場合：
  ```sh
  rm -rf node_modules package-lock.json && npm install
  ```
  でクリーンインストールを試してください。

