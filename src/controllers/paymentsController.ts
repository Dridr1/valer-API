import { Request, Response } from "express";
import * as paymentService from "../services/paymentService.js";

export const payment = async (req: Request, res: Response) => {
    const id = Number(req.params.cardId);
    const { businessId, payment, password } = req.body;
    await paymentService.payment(businessId, payment, password, id);
    return res.sendStatus(200);
}