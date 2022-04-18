import { Router } from "express";
import newCardRoute from "./cardsRouter.js";
import paymentRouter from "./paymentRouter.js";
import rechargesRouter from "./rechargesRouter.js";

const router = Router();

router.use(newCardRoute);
router.use(rechargesRouter);
router.use(paymentRouter);

export default router;