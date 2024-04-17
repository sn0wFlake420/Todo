import { Request, Response, NextFunction } from 'express';
import SECRET_KEY from './config'
import jwt from 'jsonwebtoken'


export interface AuthRequest extends Request {
    id?: number;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const token = authHeader.split(' ')[1]

    try{
        const decoded:any = jwt.verify(token, SECRET_KEY)
        req.id = decoded.id
        next()
    }
    catch(e) {
        res.status(403).json({})
    }
}
