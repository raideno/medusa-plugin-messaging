import { EventEmitter } from 'events';

/**
 * TODO: store this in variables
 */
type MedusaPluginMessagingNoteEventsType =
    'medusa-plugin-messaging-note-insert-event' |
    'medusa-plugin-messaging-note-update-event' |
    'medusa-plugin-messaging-note-delete-event';

class MedusaPluginMessagingNoteEvents {
    private static instance: MedusaPluginMessagingNoteEvents;

    private events: EventEmitter;

    private constructor() {
        this.events = new EventEmitter();
    }

    public static getInstance(): MedusaPluginMessagingNoteEvents {
        if (!MedusaPluginMessagingNoteEvents.instance) {
            MedusaPluginMessagingNoteEvents.instance = new MedusaPluginMessagingNoteEvents();
        }
        return MedusaPluginMessagingNoteEvents.instance;
    }

    public emit(event: MedusaPluginMessagingNoteEventsType, data: any) {
        this.events.emit(event, data);
    }

    public addListener(event: MedusaPluginMessagingNoteEventsType, handler: (data: any) => Promise<void> | void) {
        this.events.on(event, handler);
    }
}

export const medusaPluginMessagingNoteEvents = MedusaPluginMessagingNoteEvents.getInstance();
