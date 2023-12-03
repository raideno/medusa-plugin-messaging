import MedusaPluginMessagingNote from "../../../../../../models/note";

export type EndpointRequestBodyType = Partial<Pick<MedusaPluginMessagingNote, "content" | "title" | "metadata">>;

export type EndpointResponseBodyType = {
    note: MedusaPluginMessagingNote;
};