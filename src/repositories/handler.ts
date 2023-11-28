import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

import MedusaPluginMessagingHandler from "../models/handler";

const MedusaPluginMessagingHandlerRepository = dataSource.getRepository(MedusaPluginMessagingHandler);

export default MedusaPluginMessagingHandlerRepository