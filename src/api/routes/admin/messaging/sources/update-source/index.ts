import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingSourceService from "../../../../../../services/medusa-plugin-messaging-source";

import validate from "../../../../../../api/helpers/validate";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { BodyValidator } from "./body-validator";
import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";
import validateSourceId from "../../../../../../api/validators/validate-source-id";

export default async (req: Request, res: Response): Promise<void> => {
    const sourceService: MedusaPluginMessagingSourceService = req.scope.resolve(
        "medusaPluginMessagingSourceService"
    );

    const userId = req.user.userId;

    const channelId = req.params["channelId"] || "";
    const sourceId = req.params["sourceId"] || "";

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "validation-failed.");

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
    const updatedSource = await sourceService.update(sourceId, data);

    const response: EndpointResponseBodyType = {
        source: source
    };

    res.status(202).json(response);
};
