import useSWR, { mutate, MutatorOptions } from "swr";

import getNote from "../../functions/notes/get-note";

export const USE_NOTE_HOOK_KEY = (noteId: string): string => ['messaging', 'notes', noteId].join("/");

export type useNotesDataType = Awaited<
    ReturnType<typeof getNote>
>;

export default (noteId: string) =>
    useSWR<useNotesDataType>(
        USE_NOTE_HOOK_KEY(noteId),
        getNote.bind(null, noteId)
    );

export const mutateNote = (
    noteId: string,
    data: (
        oldData: useNotesDataType
    ) => Promise<useNotesDataType>,
    options?: boolean | MutatorOptions<useNotesDataType, useNotesDataType>
) => {
    return mutate<useNotesDataType>(
        USE_NOTE_HOOK_KEY(noteId),
        data,
        options
    );
};