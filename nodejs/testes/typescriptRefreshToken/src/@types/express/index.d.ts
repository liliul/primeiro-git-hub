import { Request } from 'express';
import { TokenPayload } from '../../types/index'; 

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; 
    }
  }
}