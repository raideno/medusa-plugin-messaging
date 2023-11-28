import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "@services/message";

import validate from "@api/helpers/validate";
import validateSourceId from "@api/validators/validate-source-id";
import validateChannelId from "@api/validators/validate-channel-id";

import { EndpointEventResponseBodyType, EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import { AuthorType } from "@models/message";
import validateMessageId from "@api/validators/validate-message-id";
import { medusaPluginMessagingMessageEvents } from "@api/events/message";
import { medusaPluginMessagingSourceEvents } from "@api/events/source";

/**
 * only staff member who posted the message can delete it
 * should this behavior change ?
 */
export default async (req: Request, res: Response): Promise<void> => {
    const messageService: MedusaPluginMessagingMessageService = req.scope.resolve(
        "medusaPluginMessagingMessageService"
    );

    const userId = req.user.userId;

    const channelId = req.params["channelId"] || "";

    if (!userId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in as an admin to access messaging events.");

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    /**
     * handle the various events
     */

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    medusaPluginMessagingSourceEvents.addListener("medusa-plugin-messaging-source-insert-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-source-insert-event",
            data: { source: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingSourceEvents.addListener("medusa-plugin-messaging-source-update-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-source-insert-event",
            data: { source: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingSourceEvents.addListener("medusa-plugin-messaging-source-delete-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-source-insert-event",
            data: { source: data }
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
