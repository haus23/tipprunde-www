declare namespace NodeJS {
  export interface ProcessEnv {
    BACKEND_HOST_URL: string;
    SESSION_SECRET: string;
  }
}

declare module 'command-score' {
  function commandScore(value: string, search: string): number;
  export = commandScore;
}
