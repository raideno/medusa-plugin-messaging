import MedusaPluginMessagingNote from "../../../../../../models/note";

export type EndpointRequestBodyType = Pick<MedusaPluginMessagingNote, "title" | "content" | "metadata" | "targetId" | "parentId">;

export type EndpointResponseBodyType = {
    note: MedusaPluginMessagingNote;
};