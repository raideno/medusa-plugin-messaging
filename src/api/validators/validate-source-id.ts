import { MedusaContainer } from "@medusajs/medusa"

import Source from "../../models/source";
import SourceService from "../../services/medusa-plugin-messaging-source";

export default async (container: MedusaContainer, sourceId: string): Promise<Source | null | undefined> => {
    const sourceService: SourceService = container.resolve("medusaPluginMessagingSourceService");

    let source: undefined | Source | null = undefined;

    try {
        source = await sourceService.retrieve(sourceId);
    } catch {
        source = null;
    }

    return source;
}