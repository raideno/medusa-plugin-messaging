import { Request, Response } from "express";

import { MedusaError } from "@medusajs/utils"

import { plainToInstance } from "class-transformer";

import MedusaPluginMessagingNoteService from "../../../../../../services/medusa-plugin-messaging-note";
import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import { BodyValidator } from "./body-validator";

import validate from "../../../../../helpers/validate";
import validateNoteId from "../../../../../validators/validate-note-id";

export default async (req: Request, res: Response) => {
    const noteService: MedusaPluginMessagingNoteService = req.scope.resolve(
        "medusaPluginMessagingNoteService"
    );

    const userId = req.user.userId

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "body-validation-failed.");

    /**
     * TODO: validate the targetId, make sure it's either a channel, message or source
     */

    if (data.parentId) {
        const isParentIdValidNote = await validateNoteId(req.scope, data.parentId);

        if (!isParentIdValidNote)
            throw new MedusaError(MedusaError.Types.INVALID_DATA, "given parentId isn't a valid noteId.");
    }

    const note = await noteService.create({
        ...data,
        authorId: userId,
    });

    const response: EndpointResponseBodyType = {
        note: note
    };

    res.status(200).json(response);
}