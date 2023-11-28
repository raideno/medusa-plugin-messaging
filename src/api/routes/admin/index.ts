import { Router } from "express";

import messagingRoutes from "./messaging";

export function attachAdminRoutes(adminRouter: Router) {
    messagingRoutes(adminRouter);
}
