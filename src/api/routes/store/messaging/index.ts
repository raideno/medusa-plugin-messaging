import { Router } from "express";

import channelsRoutes from "./channels";
import sourcesRoutes from "./sources";
import messagesRoutes from "./messages";
import webhooksRoutes from "./webhooks";

export default function attachStoreMessagingRoutes(storeRouter: Router) {
    channelsRoutes(storeRouter);
    sourcesRoutes(storeRouter);
    messagesRoutes(storeRouter);
    webhooksRoutes(storeRouter)
}
