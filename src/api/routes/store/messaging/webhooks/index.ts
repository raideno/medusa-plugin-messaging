import { Router } from "express";

import { wrapHandler } from "@medusajs/utils"

import postWebhook from "./post-webhook";

const router = Router();

export default (storeRouter: Router) => {
    // TODO: put it in a global variable
    storeRouter.use("/", router);

    router.post("/messaging/webhooks/:handlerId", wrapHandler(postWebhook));
};
