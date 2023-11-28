import { Router } from "express";

// import { wrapHandler } from "@medusajs/medusa";
import { wrapHandler } from "@medusajs/utils"

import createChannel from "./create-channel";
import getChannel from "./get-channel";
import getChannels from "./get-channels";
import updateChannel from "./update-channel";

const router = Router();

export default (storeRouter: Router) => {
    // TODO: put it in a global variable
    storeRouter.use("/", router);

    router.get("/messaging/channels", wrapHandler(getChannels));
    router.post("/messaging/channels", wrapHandler(createChannel));

    router.get("/messaging/channels/:channelId", wrapHandler(getChannel));
    router.put("/messaging/channels/:channelId", wrapHandler(updateChannel));

};
