/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VERCEL_ENV: 'development' | 'preview' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 
