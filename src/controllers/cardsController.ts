import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export const createCard = async (req: Request, res: Response) => {
    const { type } = req.body;
    const { employee } = res.locals;
    const card = await cardService.create(type, employee);
    res.status(201).send(card);
}

export const activateCard = async (req: Request, res: Response) => {
    const id = Number(req.params.cardId);
    const { password, securityCode } = req.body;
    await cardService.activateCard(securityCode, password, id);
    res.sendStatus(200);
}

export const balanceCard = async (req: Request, res: Response) => {
    const id = Number(req.params.cardId);
    const result = await cardService.balanceCard(id);
    res.status(200).send(result);
}