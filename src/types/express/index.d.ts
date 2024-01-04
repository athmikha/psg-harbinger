export {};

declare global {
  namespace Express {
    export interface Request {
      inputs?: {
        [x: string]: any;
      };
      user?: any | null;
    }
  }
}
