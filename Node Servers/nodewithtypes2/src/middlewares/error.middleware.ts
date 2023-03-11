import { Request, Response, NextFunction } from "express";
import HttpException from "@/utils/exceptions/http.exception";

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).send({ status, message });
}

export default errorMiddleware;