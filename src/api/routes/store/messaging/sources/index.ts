import { Router } from "express";

// import { wrapHandler } from "@medusajs/medusa";
import { wrapHandler } from "@medusajs/utils"

import getSources from "./get-sources";
import createSource from "./create-source";
import getSource from "./get-source";
import updateSource from "./update-source";

/**
 * TODO: implement
 */
import archiveSource from "./archive-source";

const router = Router();

export default (storeRouter: Router) => {
    // TODO: put it in a global variable
    storeRouter.use("/", router);

    router.get("/messaging/channels/:channelId/sources", wrapHandler(getSources));
    router.post("/messaging/channels/:channelId/sources", wrapHandler(createSource));

    router.get("/messaging/channels/:channelId/sources/:sourceId", wrapHandler(getSource));
    router.put("/messaging/channels/:channelId/sources/:sourceId", wrapHandler(updateSource));
    router.delete("/messaging/channels/:channelId/sources/:sourceId", wrapHandler(archiveSource));

};
