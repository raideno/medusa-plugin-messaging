/**
 * TODO: global mutation function
 */

import { MutatorOptions } from "swr";

import Note from "../../../types/note";
import { mutateNote } from "./use-note";
import { mutateNotes } from "./use-target-notes";

/**
 * a function to mutate data on both use-note and use-notes
 * 
 * we call mutator when we update, add or delete
 * 
 * we gonna have three functions:
 * * notesCreateMutate(note: Note);
 * * * it'll add the given note to the use-notes and use-note
 * * notesDeleteMutate(note: Note);
 * * * it'll remove the note from the use-notes and make it undefined || null on the use-note
 * * notesUpdateMutate(note: Note);
 * * * it'll update the note on both use-note and use-notes
 */

export async function noteCreateMutate(targetId: string, note: Note, options?: MutatorOptions) {
    await mutateNotes(targetId, async (oldData) => {
        return {
            /**
             * TODO: check if we need to mutate or it's not necessary
             */
            notes: [
                ...(JSON.parse(JSON.stringify(oldData.notes)) as typeof oldData.notes),
                /**
                 * TODO: fix type error
                 */
                note as any
            ],
            count: oldData.count + 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateNote(note.id, async () => {
        /**
         * TODO: fix type issue
         */
        return ({
            note
        }) as any;
    }, options);
}

export async function noteUpdateMutate(targetId: string, note: Note, options?: MutatorOptions) {
    await mutateNotes(targetId, async (oldData) => {
        const newNotes = JSON.parse(JSON.stringify(oldData.notes)) as typeof oldData.notes;

        const noteIndex = newNotes.findIndex((c) => c.id === note.id);

        newNotes[noteIndex] = (note) as any;

        return {
            notes: newNotes,
            count: oldData.count
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateNote(note.id, async () => {
        return {
            note: note as any
        };
    }, options);
}

export async function noteDeleteMutate(targetId: string, note: Note, options?: MutatorOptions) {
    await mutateNotes(targetId, async (oldData) => {
        const newNotes = JSON.parse(JSON.stringify(oldData.notes)) as typeof oldData.notes;

        const noteIndex = newNotes.findIndex((c) => c.id === note.id);

        newNotes.splice(noteIndex, 1)

        return {
            notes: newNotes,
            count: oldData.count - 1
        }
    }, options);
    /**
     * TODO: check if it'll not cause an error since the key isn't known by swr yet
     */
    await mutateNote(note.id, async () => {
        return null;
    }, options);
}