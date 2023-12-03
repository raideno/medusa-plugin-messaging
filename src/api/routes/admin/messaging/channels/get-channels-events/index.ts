import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "../../../../../../services/medusa-plugin-messaging-message";

import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { EndpointEventResponseBodyType, EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import { medusaPluginMessagingChannelEvents } from "../../../../../../api/events/channel";

/**
 * only staff member who posted the message can delete it
 * should this behavior change ?
 */
export default async (req: Request, res: Response): Promise<void> => {
    const messageService: MedusaPluginMessagingMessageService = req.scope.resolve(
        "medusaPluginMessagingMessageService"
    );

    const userId = req.user.userId;

    // const channelId = req.params["channelId"] || "";

    if (!userId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in as an admin to access messaging events.");

    // const isChannelIdValid = await validateChannelId(req.scope, channelId);

    // if (!isChannelIdValid)
    //     throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    // const channel = isChannelIdValid;

    /**
     * handle the various events
     */

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    medusaPluginMessagingChannelEvents.addListener("medusa-plugin-messaging-channel-insert-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-channel-insert-event",
            data: { channel: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingChannelEvents.addListener("medusa-plugin-messaging-channel-update-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-channel-update-event",
            data: { channel: data }
        };
        res.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    medusaPluginMessagingChannelEvents.addListener("medusa-plugin-messaging-channel-delete-event", (data) => {
        const event: EndpointEventResponseBodyType = {
            name: "medusa-plugin-messaging-channel-delete-event",
            data: { channel: data }
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
