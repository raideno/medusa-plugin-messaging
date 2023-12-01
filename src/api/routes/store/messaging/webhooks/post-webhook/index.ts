/**
 * /store/messaging/webhooks/:handlerId
 * 
 * receive a webhook and hand it to the corresponding handler
 */

import { Request, Response } from "express";

import { ConfigModule, Logger } from "@medusajs/medusa"
import { MedusaError } from "@medusajs/utils";

import PluginOptions from "../../../../../../types/plugin-options";

import { EndpointRequestBodyType, EndpointResponseBodyType } from "./types";

export default async (req: Request, res: Response): Promise<void> => {
    const logger = req.scope.resolve<Logger>("logger");
    /**
     * TODO: make sure that the configuration is the one of the plugin
     */
    const configuration = req.scope.resolve<PluginOptions>(
        "configModule"
    );

    const handlerId = req.params["handlerId"] || "";

    const handler = configuration.handlers.find((h) => h.id === handlerId);

    if (!handler) {
        logger.warn(`[medusa-plugin-messaging](store/post-webhook): provided handlerId (${handlerId}) isn't supported.`);
        throw new MedusaError(MedusaError.Types.NOT_FOUND, `given handlerId (${handlerId}) isn't supported.`);
    }

    try {
        const treatment = await handler.onReceive(req);

        if (!treatment) {
            logger.error(`[medusa-plugin-messaging](store/post-webhook): handler (${handlerId}) failed to handle request.`);
            throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, `handler failed to handle request.`);
        }
    } catch (error) {
        logger.error(`[medusa-plugin-messaging](store/post-webhook): handler (${handlerId}) failed to handle request.`);
        throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, `handler failed to handle request.`);
    } finally {

    }

    res.sendStatus(200);
};
