import { NextFunction, Request, Response } from "express";
import * as companyService from "../services/companyService.js"

export const validateAPIKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];

    if(!apiKey) throw {type: "unauthorized"};

    res.locals.company = await companyService.findByApiKey(`${apiKey}`);

    next();
}  