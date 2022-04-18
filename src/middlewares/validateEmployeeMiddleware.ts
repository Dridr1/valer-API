import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employeeService.js";

export const validateEmployeeIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = Number(req.params.employeeId);

    if (!employeeId) throw { type: "bad_request" }

    res.locals.employee = await employeeService.findById(employeeId);

    next();
}