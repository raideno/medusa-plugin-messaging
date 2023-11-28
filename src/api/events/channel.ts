import { EventEmitter } from 'events';

/**
 * TODO: store this in variables
 */
type MedusaPluginMessagingChannelEventsType =
    'medusa-plugin-messaging-channel-insert-event' |
    'medusa-plugin-messaging-channel-update-event' |
    'medusa-plugin-messaging-channel-delete-event';

class MedusaPluginMessagingChannelEvents {
    private static instance: MedusaPluginMessagingChannelEvents;

    private events: EventEmitter;

    private constructor() {
        this.events = new EventEmitter();
    }

    public static getInstance(): MedusaPluginMessagingChannelEvents {
        if (!MedusaPluginMessagingChannelEvents.instance) {
            MedusaPluginMessagingChannelEvents.instance = new MedusaPluginMessagingChannelEvents();
        }
        return MedusaPluginMessagingChannelEvents.instance;
    }

    public emit(event: MedusaPluginMessagingChannelEventsType, data: any) {
        this.events.emit(event, data);
    }

    public addListener(event: MedusaPluginMessagingChannelEventsType, handler: (data: any) => Promise<void> | void) {
        this.events.on(event, handler);
    }
}

export const medusaPluginMessagingChannelEvents = MedusaPluginMessagingChannelEvents.getInstance();
