import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "@services/message";

import validate from "@api/helpers/validate";
import validateSourceId from "@api/validators/validate-source-id";
import validateChannelId from "@api/validators/validate-channel-id";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import { AuthorType } from "@models/message";
import validateMessageId from "@api/validators/validate-message-id";

export default async (req: Request, res: Response): Promise<void> => {
    const messageService: MedusaPluginMessagingMessageService = req.scope.resolve(
        "medusaPluginMessagingMessageService"
    );

    const customerId = req.user.customer_id;

    if (!customerId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in.")

    const channelId = req.params["channelId"] || "";
    const sourceId = req.params["sourceId"] || "";
    const messageId = req.params["messageId"] || "";

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    if (channel.id !== customerId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you can't consult messages on channels you don't own.");

    const isSourceIdValid = await validateSourceId(req.scope, sourceId);

    if (!isSourceIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid sourceId provided.");

    const source = isSourceIdValid;

    if (source.channelId !== channel.id)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "given sourceId isn't a part of the given channelId.");

    const isMessageIdValid = await validateMessageId(req.scope, messageId);

    if (!isMessageIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid messageId provided.");

    const message = isMessageIdValid;

    if (message.sourceId !== source.id)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "given messageId isn't a part of the given sourceId.");

    /**
     * TODO: should we wrap it with a try catch ?
     */
    const response: EndpointResponseBodyType = {
        message: message
    };

    res.status(202).json(response);
};
