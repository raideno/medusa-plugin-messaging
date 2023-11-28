import { EventEmitter } from 'events';

/**
 * TODO: store this in variables
 */
type MedusaPluginMessagingSourceEventsType =
    'medusa-plugin-messaging-source-insert-event' |
    'medusa-plugin-messaging-source-update-event' |
    'medusa-plugin-messaging-source-delete-event';

class MedusaPluginMessagingSourceEvents {
    private static instance: MedusaPluginMessagingSourceEvents;

    private events: EventEmitter;

    private constructor() {
        this.events = new EventEmitter();
    }

    public static getInstance(): MedusaPluginMessagingSourceEvents {
        if (!MedusaPluginMessagingSourceEvents.instance) {
            MedusaPluginMessagingSourceEvents.instance = new MedusaPluginMessagingSourceEvents();
        }
        return MedusaPluginMessagingSourceEvents.instance;
    }

    public emit(event: MedusaPluginMessagingSourceEventsType, data: any) {
        this.events.emit(event, data);
    }

    public addListener(event: MedusaPluginMessagingSourceEventsType, handler: (data: any) => Promise<void> | void) {
        this.events.on(event, handler);
    }
}

export const medusaPluginMessagingSourceEvents = MedusaPluginMessagingSourceEvents.getInstance();
