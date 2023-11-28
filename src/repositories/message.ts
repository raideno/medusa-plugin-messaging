import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

import MedusaPluginMessagingMessage from "../models/message";

const MedusaPluginMessagingMessageRepository = dataSource.getRepository(MedusaPluginMessagingMessage);

export default MedusaPluginMessagingMessageRepository