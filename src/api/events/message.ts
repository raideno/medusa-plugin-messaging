import { EventEmitter } from 'events';

/**
 * TODO: store this in variables
 */
type MedusaPluginMessagingMessageEventsType =
    'medusa-plugin-messaging-message-insert-event' |
    'medusa-plugin-messaging-message-update-event' |
    'medusa-plugin-messaging-message-delete-event';

class MedusaPluginMessagingMessageEvents {
    private static instance: MedusaPluginMessagingMessageEvents;

    private events: EventEmitter;

    private constructor() {
        this.events = new EventEmitter();
    }

    public static getInstance(): MedusaPluginMessagingMessageEvents {
        if (!MedusaPluginMessagingMessageEvents.instance) {
            MedusaPluginMessagingMessageEvents.instance = new MedusaPluginMessagingMessageEvents();
        }
        return MedusaPluginMessagingMessageEvents.instance;
    }

    public emit(event: MedusaPluginMessagingMessageEventsType, data: any) {
        this.events.emit(event, data);
    }

    public addListener(event: MedusaPluginMessagingMessageEventsType, handler: (data: any) => Promise<void> | void) {
        this.events.on(event, handler);
    }
}

export const medusaPluginMessagingMessageEvents = MedusaPluginMessagingMessageEvents.getInstance();
