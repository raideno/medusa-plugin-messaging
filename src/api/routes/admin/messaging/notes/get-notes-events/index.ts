import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "../../../../../../services/medusa-plugin-messaging-message";

import validateNoteId from "../../../../../validators/validate-note-id";

import { EndpointEventResponseBodyType, EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import { medusaPluginMessagingNoteEvents } from "../../../../../events/note";

/**
 * only staff member who posted the message can delete it
 * should this behavior change ?
 */
export default async (req: Request, res: Response): Promise<void> => {
    const userId = req.user.userId;

    const noteId = req.params["noteId"] || "";

    if (!userId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in as an admin to access messaging events.");

    const isNoteIdValid = await validateNoteId(req.scope, noteId);

    if (!isNoteIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid noteId provided.");

    const note = isNoteIdValid;

    /**
     * handle the various events
     */

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    medusaPluginMessagingNoteEvents.addListener("medusa-plugin-messaging-note-insert-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-note-insert-event",
            data: { note: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingNoteEvents.addListener("medusa-plugin-messaging-note-update-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-note-update-event",
            data: { note: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingNoteEvents.addListener("medusa-plugin-messaging-note-delete-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-note-delete-event",
            data: { note: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    req.on('close', () => {
        /**
         * TODO: clearing
         */
        res.end();
    });
};
