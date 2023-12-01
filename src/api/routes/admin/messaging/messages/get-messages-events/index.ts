import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "../../../../../../services/medusa-plugin-messaging-message";

import validateSourceId from "../../../../../../api/validators/validate-source-id";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { EndpointEventResponseBodyType, EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import validateMessageId from "../../../../../../api/validators/validate-message-id";
import { medusaPluginMessagingMessageEvents } from "../../../../../../api/events/message";

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
    const sourceId = req.params["sourceId"] || "";

    if (!userId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in as an admin to access messaging events.");

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    const isSourceIdValid = await validateSourceId(req.scope, sourceId);

    if (!isSourceIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid sourceId provided.");

    const source = isSourceIdValid;

    if (source.channelId !== channel.id)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "given sourceId isn't a part of the given channelId.");

    /**
     * handle the various events
     */

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    medusaPluginMessagingMessageEvents.addListener("medusa-plugin-messaging-message-insert-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-message-insert-event",
            data: { message: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingMessageEvents.addListener("medusa-plugin-messaging-message-update-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-message-insert-event",
            data: { message: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingMessageEvents.addListener("medusa-plugin-messaging-message-delete-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-message-insert-event",
            data: { message: data }
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
