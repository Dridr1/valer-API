import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import * as schemas from "../schemas/index.js";
import * as paymentController from "../controllers/paymentsController.js";

const paymentRouter = Router();

paymentRouter.post(
    "/payment/:cardId",
    validateSchemaMiddleware(schemas.paymentSchema),
    paymentController.payment
);

export default paymentRouter;