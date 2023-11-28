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
import getMessagesEvents from "./get-messages-events";

const router = Router();

export default (adminRouter: Router) => {
    // TODO: put it in a global variable
    adminRouter.use("/", router);

    router.get("/messaging/channels/:channelId/sources/:sourceId/messages", wrapHandler(getMessages));
    router.post("/messaging/channels/:channelId/sources/:sourceId/messages", wrapHandler(createMessage));

    router.post("/messaging/messages/events", wrapHandler(getMessagesEvents));

    router.get("/messaging/channels/:channelId/sources/:sourceId/messages/:messageId", wrapHandler(getMessage));
    router.put("/messaging/channels/:channelId/sources/:sourceId/messages/:messageId", wrapHandler(updateMessage));
    router.delete("/messaging/channels/:channelId/sources/:sourceId/messages/:messageId", wrapHandler(deleteMessage));

};
