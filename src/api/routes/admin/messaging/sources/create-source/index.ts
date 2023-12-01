import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingSourceService from "../../../../../../services/medusa-plugin-messaging-source";

import validate from "../../../../../../api/helpers/validate";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { BodyValidator } from "./body-validator";
import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

export default async (req: Request, res: Response): Promise<void> => {
    const sourceService: MedusaPluginMessagingSourceService = req.scope.resolve(
        "medusaPluginMessagingSourceService"
    );

    const userId = req.user.userId;

    const channelId = req.params["channelId"] || "";

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "validation-failed.");

    const isChannelIdValid = await validateChannelId(req.scope, channelId);

    if (!isChannelIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid channelId provided.");

    const channel = isChannelIdValid;

    /**
     * TODO: should we wrap it with a try catch ?
     */
    const source = await sourceService.create(data);

    const response: EndpointResponseBodyType = {
        source: source
    };

    res.status(202).json(response);
};
