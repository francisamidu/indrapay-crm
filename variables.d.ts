interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_CRM_EMAIL: string;
  VITE_CRM_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
