import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { EndpointResponseBodyType } from "./types";

import validateNoteId from "../../../../../validators/validate-note-id";

export default async (req: Request, res: Response) => {
    const userId = req.user.userId

    const noteId = req.params.noteId;

    const isNoteIdValid = await validateNoteId(req.scope, noteId);

    if (isNoteIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_ARGUMENT, "invalid noteId provided.");

    const note = isNoteIdValid;

    const response: EndpointResponseBodyType = {
        note: note,
    };

    res.status(200).json(response);
}