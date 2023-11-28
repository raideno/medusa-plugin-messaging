import { Router } from "express";

// import { wrapHandler } from "@medusajs/medusa";
import { wrapHandler } from "@medusajs/utils"

import getSources from "./get-sources";
import createSource from "./create-source";
import getSource from "./get-source";
import updateSource from "./update-source";
import deleteSource from "./delete-source";
import getSourcesEvents from "./get-sources-events";

const router = Router();

export default (adminRouter: Router) => {
    // TODO: put it in a global variable
    adminRouter.use("/", router);

    router.get("/messaging/channels/:channelId/sources", wrapHandler(getSources));
    router.post("/messaging/channels/:channelId/sources", wrapHandler(createSource));

    router.get("/messaging/sources/events", wrapHandler(getSourcesEvents));

    router.get("/messaging/channels/:channelId/sources/:sourceId", wrapHandler(getSource));
    router.put("/messaging/channels/:channelId/sources/:sourceId", wrapHandler(updateSource));
    router.delete("/messaging/channels/:channelId/sources/:sourceId", wrapHandler(deleteSource));

};
