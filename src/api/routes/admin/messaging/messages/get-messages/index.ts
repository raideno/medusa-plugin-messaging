import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingMessageService from "../../../../../../services/medusa-plugin-messaging-message";

import validateSourceId from "../../../../../../api/validators/validate-source-id";
import validateChannelId from "../../../../../../api/validators/validate-channel-id";

import { QueryParamsValidator } from "./query-params-validator";

import { EndpointRequestBodyType, EndpointResponseBodyType, EndpointRequestQueryParamsType } from "./types";
import validate from "../../../../../helpers/validate";

export default async (req: Request, res: Response): Promise<void> => {
    const messageService: MedusaPluginMessagingMessageService = req.scope.resolve(
        "medusaPluginMessagingMessageService"
    );

    const userId = req.user.userId;

    const queryParams = (req.query || {}) as EndpointRequestQueryParamsType;

    const data = plainToInstance(QueryParamsValidator, queryParams);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "query-params-validation-failed.");

    const channelId = req.params["channelId"] || "";
    const sourceId = req.params["sourceId"] || "";

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

    const [messages, count] = await messageService.listAndCount({
        sourceId: source.id,
    }, {
        skip: parseInt(queryParams.offset as unknown as string),
        take: parseInt(queryParams.limit as unknown as string),
        order: {
            "created_at": 'ASC'
        },
    })

    const response: EndpointResponseBodyType = {
        count: count,
        messages: messages
    };

    res.status(200).json(response);
};
