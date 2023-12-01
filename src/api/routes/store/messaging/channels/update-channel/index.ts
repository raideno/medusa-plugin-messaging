import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingChannelService from "../../../../../../services/medusa-plugin-messaging-channel";

import validate from "../../../../../../api/helpers/validate";

import { BodyValidator } from "./body-validator";
import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

export default async (req: Request, res: Response): Promise<void> => {
    const channelService: MedusaPluginMessagingChannelService = req.scope.resolve(
        "medusaPluginMessagingChannelService"
    );

    const customerId = req.user.customer_id;

    const channelId = req.params["channelId"];

    if (!customerId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you must be logged in.")

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "validation-failed.");

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    if (channel.customerId !== customerId)
        throw new MedusaError(MedusaError.Types.UNAUTHORIZED, "you can't modify a channel you don't own.");

    const updatedChannel = await channelService.update(channelId, data);

    const response: EndpointResponseBodyType = {
        channel: updatedChannel
    };

    res.status(202).json(response);
};
