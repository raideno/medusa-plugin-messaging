import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingChannelService from "@services/channel";

import validate from "@api/helpers/validate";
import validateCustomerId from "@api/validators/validate-customer-id";

import { BodyValidator } from "./body-validator";
import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import validateChannelId from "@api/validators/validate-channel-id";

export default async (req: Request, res: Response): Promise<void> => {
    const channelService: MedusaPluginMessagingChannelService = req.scope.resolve(
        "medusaPluginMessagingChannelService"
    );

    const channelId = req.params["channelId"] || "";

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "validation-failed.");

    const isChannelValid = await validateChannelId(req.scope, channelId);

    if (!isChannelValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    /**
     * TODO: should we wrap it with a try catch ?
     */
    const updatedChannel = await channelService.update(channelId, data);

    const response: EndpointResponseBodyType = {
        channel: updatedChannel
    };

    res.status(202).json(response);
};
