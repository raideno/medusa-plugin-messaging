import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

import MedusaPluginMessagingSource from "../models/source";

const MedusaPluginMessagingSourceRepository = dataSource.getRepository(MedusaPluginMessagingSource);

export default MedusaPluginMessagingSourceRepository