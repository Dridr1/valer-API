import { Router } from "express";
import { validateEmployeeIdMiddleware } from "../middlewares/validateEmployeeMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateAPIKeyMiddleware } from "../middlewares/verifyAPIKeyMiddleware.js";
import * as schemas from "../schemas/index.js";
import * as cards from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post(
    "/cards/create/:employeeId",
    validateAPIKeyMiddleware,
    validateEmployeeIdMiddleware,
    validateSchemaMiddleware(schemas.newCardSchema),
    cards.createCard
);

cardsRouter.patch(
    "/cards/:cardId/activate",
    validateSchemaMiddleware(schemas.existentCardSchema),
    cards.activateCard
);

cardsRouter.get(
    "/cards/:cardId/balance",
    cards.balanceCard
);

export default cardsRouter;