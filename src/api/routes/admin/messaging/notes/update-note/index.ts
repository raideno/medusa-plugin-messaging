import { plainToInstance } from "class-transformer";
import { MedusaError } from "@medusajs/utils";

import { Request, Response } from "express";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

import validateNoteId from "../../../../../validators/validate-note-id";

import MedusaPluginMessagingNoteService from "../../../../../../services/medusa-plugin-messaging-note";
import validate from "../../../../../helpers/validate";
import { BodyValidator } from "./body-validator";

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

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "validation-failed.");

    const updatedNote = await noteService.update(noteId, data);

    const response: EndpointResponseBodyType = {
        note: updatedNote
    };

    res.status(202).json(response);
}