import { Router } from "express";

// import { wrapHandler } from "@medusajs/medusa";
import { wrapHandler } from "@medusajs/utils"

import getChannels from "./get-channels";
import createChannel from "./create-channel";
import getChannel from "./get-channel";
import updateChannel from "./update-channel";
import deleteChannel from "./delete-channel";
import getChannelsEvents from "./get-channels-events";

const router = Router();

export default (adminRouter: Router) => {
    // TODO: put it in a global variable
    adminRouter.use("/", router);


    router.get("/messaging/channels", wrapHandler(getChannels));
    router.post("/messaging/channels", wrapHandler(createChannel));

    router.get("/messaging/channels/events", wrapHandler(getChannelsEvents));

    router.get("/messaging/channels/:channelId", wrapHandler(getChannel));
    router.put("/messaging/channels/:channelId", wrapHandler(updateChannel));
    router.delete("/messaging/channels/:channelId", wrapHandler(deleteChannel));

};
