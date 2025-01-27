import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);
    res.status(500).send({ message: err.message });
};
