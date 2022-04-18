import * as cardService from "./cardService.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js"

export const rechargeCard = async (amount: number, id: number) => {
    const card = await cardService.resgisteredCard(id);
    cardService.expirationCard(card.expirationDate);
    await rechargeRepository.insert({cardId: id, amount});
}