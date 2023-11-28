import { Router } from "express";

import channelsRoutes from "./channels";
import sourcesRoutes from "./sources";
import messagesRoutes from "./messages";

export default function attachAdminMessagingRoutes(adminRouter: Router) {
    channelsRoutes(adminRouter);
    sourcesRoutes(adminRouter);
    messagesRoutes(adminRouter);
}
