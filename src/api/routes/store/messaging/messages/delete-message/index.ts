import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "../../../../../../services/medusa-plugin-messaging-message";

import validate from "../../../../../../api/helpers/validate";
import validateSourceId from "../../../../../../api/validators/validate-source-id";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import validateMessageId from "../../../../../../api/validators/validate-message-id";
import { AuthorType } from "../../../../../../types/message";

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
    const messageId = req.params["messageId"] || "";

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

    const isMessageIdValid = await validateMessageId(req.scope, messageId);

    if (!isSourceIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid messageId provided.");

    const message = isMessageIdValid;

    if (message.sourceId !== source.id)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "given messageId isn't a part of the given sourceId.");

    if (message.author.type !== AuthorType.STAFF)
        throw new MedusaError(MedusaError.Types.NOT_ALLOWED, "you can't delete a message you haven't sent.");

    if (message.author.userId !== userId)
        throw new MedusaError(MedusaError.Types.NOT_ALLOWED, "you can't delete a message you haven't sent.");

    await messageService.delete(messageId);

    // const response: EndpointResponseBodyType;

    res.sendStatus(200);
};
