
export interface process {
  env: {
    NODE_ENV: string;
    VITE_API_URL: string;
  };
}


declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
export { }
