import { MedusaContainer } from "@medusajs/medusa"

import Message from "@models/message";
import MessageService from "@services/message";

export default async (container: MedusaContainer, messageId: string): Promise<Message | null | undefined> => {
    const messageService: MessageService = container.resolve("medusaPluginMessagingMessageService");

    let message: undefined | Message | null = undefined;

    try {
        message = await messageService.retrieve(messageId);
    } catch {
        message = null;
    }

    return message;
}