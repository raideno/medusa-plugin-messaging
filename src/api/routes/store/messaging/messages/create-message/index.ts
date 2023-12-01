import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "../../../../../../services/medusa-plugin-messaging-message";

import validate from "../../../../../../api/helpers/validate";
import validateSourceId from "../../../../../../api/validators/validate-source-id";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { BodyValidator } from "./body-validator";
import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import { AuthorType } from "../../../../../../types/message";

export default async (req: Request, res: Response): Promise<void> => {
    const messageService: MedusaPluginMessagingMessageService = req.scope.resolve(
        "medusaPluginMessagingMessageService"
    );

    const customerId = req.user.customer_id;

    if (!customerId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in.")

    const channelId = req.params["channelId"] || "";
    const sourceId = req.params["sourceId"] || "";

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "validation-failed.");

    if (data.sourceId !== sourceId)
        throw new MedusaError(MedusaError.Types.CONFLICT, "sourceId provided in body and sourceId provided in path params are different.")

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
     * TODO: should we wrap it with a try catch ?
     */
    const message = await messageService.create({
        ...data,
        author: {
            type: AuthorType.CUSTOMER,
        }
    });

    const response: EndpointResponseBodyType = {
        message: message
    };

    res.status(202).json(response);
};
