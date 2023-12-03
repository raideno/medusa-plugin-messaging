/**
 * /admin/messaging/notes?targetId:string
 */

import { Router } from "express";

import { wrapHandler } from "@medusajs/utils"

import getNotes from "./get-notes";
import getNote from "./get-note";
import updateNote from "./update-note";
import deleteNote from "./delete-note";
import createNote from "./create-note";

const router = Router();

export default (adminRouter: Router) => {
    adminRouter.use("/", router);

    router.get("/messaging/notes", wrapHandler(getNotes));
    router.post("/messaging/notes", wrapHandler(createNote));

    /**
        * admin/messaging/notes?targetId:string
    */
    router.get("/messaging/notes/:noteId", wrapHandler(getNote));
    router.put("/messaging/notes/:noteId", wrapHandler(updateNote));
    router.delete("/messaging/notes/:noteId", wrapHandler(deleteNote));
};
