import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";

import { MedusaError } from "@medusajs/utils";

import MedusaPluginMessagingChannelService from "../../../../../../services/medusa-plugin-messaging-channel";

import validate from "../../../../../../api/helpers/validate";
import validateCustomerId from "../../../../../../api/validators/validate-customer-id";

import { BodyValidator } from "./body-validator";
import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

export default async (req: Request, res: Response): Promise<void> => {
    const channelService: MedusaPluginMessagingChannelService = req.scope.resolve(
        "medusaPluginMessagingChannelService"
    );

    // const customerId = req.params["customerId"] || "";

    const body = (req.body || {}) as EndpointRequestBodyType;

    const data = plainToInstance(BodyValidator, body);

    const validation = await validate(data);

    if (!validation.isValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "validation-failed.");

    // if (customerId !== data.customerId)
    //     throw new MedusaError(MedusaError.Types.CONFLICT, "customerId provided in body and customerId provided in path params are different.")

    const isCustomerIdValid = await validateCustomerId(req.scope, data.customerId);

    if (!isCustomerIdValid)
        throw new MedusaError(MedusaError.Types.INVALID_DATA, "invalid customer id provided.");

    const customer = isCustomerIdValid;

    /**
     * TODO: should we do more validation then this ?
     */
    if (customer.channelId)
        throw new MedusaError(MedusaError.Types.NOT_ALLOWED, "customer already have a channel.");

    /**
     * TODO: should we wrap it with a try catch ?
     */
    const channel = await channelService.create(data);

    const response: EndpointResponseBodyType = {
        channel: channel
    };

    res.status(202).json(response);
};
