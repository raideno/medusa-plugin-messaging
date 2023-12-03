import useSWR, { mutate, MutatorOptions } from "swr";

import getNotes from "../../functions/notes/get-notes";

export const USE_TARGET_NOTES_HOOK_KEY = (targetId: string): string => ['messaging', 'notes', targetId].join("/");

export type useNotesDataType = Awaited<
    ReturnType<typeof getNotes>
>;

export default (
    targetId: string,
    offset: number = 0,
    limit: number = 10
) =>
    useSWR<useNotesDataType>(
        USE_TARGET_NOTES_HOOK_KEY(targetId),
        getNotes.bind(null, {
            targetId,
            offset,
            limit
        })
    );

export const mutateNotes = (
    targetId: string,
    data: (
        oldData: useNotesDataType
    ) => Promise<useNotesDataType>,
    options?: boolean | MutatorOptions<useNotesDataType, useNotesDataType>
) => {
    return mutate<useNotesDataType>(
        USE_TARGET_NOTES_HOOK_KEY(targetId),
        data,
        options
    );
};