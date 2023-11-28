/**
 * /admin/messaging/channels/:channelId/sources/:sourceId/messages
 */

import { Router } from "express";

// import { wrapHandler } from "@medusajs/medusa";
import { wrapHandler } from "@medusajs/utils"

import getMessages from "./get-messages";
import createMessage from "./create-message";
import getMessage from "./get-message";
import updateMessage from "./update-message";
import deleteMessage from "./delete-message";

const router = Router();

export default (storeRouter: Router) => {
    // TODO: put it in a global variable
    storeRouter.use("/", router);

    router.get("/messaging/channels/:channelId/sources/:sourceId/messages", wrapHandler(getMessages));
    router.post("messaging/channels/:channelId/sources/:sourceId/messages", wrapHandler(createMessage));

    router.get("/messaging/channels/:channelId/sources/:sourceId/messages/:messageId", wrapHandler(getMessage));
    router.put("/messaging/channels/:channelId/sources/:sourceId/messages/:messageId", wrapHandler(updateMessage));
    router.delete("/messaging/channels/:channelId/sources/:sourceId/messages/:messageId", wrapHandler(deleteMessage));

};
