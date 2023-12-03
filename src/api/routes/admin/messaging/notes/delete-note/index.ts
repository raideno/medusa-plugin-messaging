import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { EndpointResponseBodyType } from "./types";

import validateNoteId from "../../../../../validators/validate-note-id";

import MedusaPluginMessagingNoteService from "../../../../../../services/medusa-plugin-messaging-note";

export default async (req: Request, res: Response) => {
    const noteService: MedusaPluginMessagingNoteService = req.scope.resolve(
        "medusaPluginMessagingNoteService"
    );

    const userId = req.user.userId

    const noteId = req.params.noteId;

    const isNoteIdValid = await validateNoteId(req.scope, noteId);

    if (isNoteIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_ARGUMENT, "invalid noteId provided.");

    const note = isNoteIdValid;

    await noteService.delete(note.id);

    res.sendStatus(200);
}