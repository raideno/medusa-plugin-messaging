import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

import MedusaPluginMessagingChannel from "../models/channel";

const MedusaPluginMessagingChannelRepository = dataSource.getRepository(MedusaPluginMessagingChannel);

export default MedusaPluginMessagingChannelRepository