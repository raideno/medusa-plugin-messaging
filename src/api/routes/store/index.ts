import { Router } from "express";

import messagingRoutes from "./messaging";

export function attachStoreRoutes(storeRouter: Router) {
    messagingRoutes(storeRouter);
}
