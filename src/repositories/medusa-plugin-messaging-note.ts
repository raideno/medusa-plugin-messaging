import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"

import MedusaPluginMessagingNote from "../models/note";

const MedusaPluginMessagingNoteRepository = dataSource.getRepository(MedusaPluginMessagingNote);

export default MedusaPluginMessagingNoteRepository