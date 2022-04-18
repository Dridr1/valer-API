import { Request, Response } from "express";
import * as rechargeService from "../services/rechargesService.js";

export async function recharge(req: Request, res: Response){
    const { recharge } = req.body;
    const id = Number(req.params.cardId);
    await rechargeService.rechargeCard(recharge, id);

    return res.sendStatus(200);
}