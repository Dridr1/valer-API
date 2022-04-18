import { Router } from "express";
import { validateAPIKeyMiddleware } from "../middlewares/verifyAPIKeyMiddleware.js";
import * as schemas from "../schemas/index.js"
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import * as rechargesController from "../controllers/rechargesController.js";

const rechargesRouter = Router()

rechargesRouter.post(
    "/recharges/:cardId",
    validateAPIKeyMiddleware,
    validateSchemaMiddleware(schemas.rechargeCardSchema),
    rechargesController.recharge
);

export default rechargesRouter;