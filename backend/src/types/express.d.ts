// src/types/express.d.ts
declare namespace Express {
    export interface Request {
      user?: { userId: number }; // or define the exact shape of the user object
    }
  }
  