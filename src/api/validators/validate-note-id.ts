import { MedusaContainer } from "@medusajs/medusa"

import Note from "../../models/note";
import NoteService from "../../services/medusa-plugin-messaging-note";

export default async (container: MedusaContainer, noteId: string): Promise<Note | null | undefined> => {
    const noteService: NoteService = container.resolve("medusaPluginMessagingNoteService");

    let note: undefined | Note | null = undefined;

    try {
        note = await noteService.retrieve(noteId);
    } catch {
        note = null;
    }

    return note;
}