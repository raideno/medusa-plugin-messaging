import { useState, ChangeEvent } from "react"

import { Button, Input, Label, Textarea, useToast, useToggleState } from "@medusajs/ui";

import Channel from "../../../../types/channel";

import createNote from "../../../functions/notes/create-note";

import { noteCreateMutate } from "../../../hooks/notes";

type Data = {
    title?: string;
    content?: string;
}

const DEFAULT_DATA: Data = {
    title: undefined,
    content: undefined,
};

type ChannelsNotesModalCreateNoteProps = {
    channel: Channel
}

const ChannelsNotesModalCreateNote = ({
    channel
}: ChannelsNotesModalCreateNoteProps) => {

    const { toast } = useToast();

    const {
        state: isFormOpen,
        open: openForm,
        close: closeForm,
        toggle: toggleForm
    } = useToggleState(false);

    const [data, setData] = useState<Data>(DEFAULT_DATA);

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isCancelationLoading, setIsCancelationLoading] = useState<boolean>(false);

    function handleDataKeyValueChange(key: keyof typeof data, event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        const newData = JSON.parse(JSON.stringify(data)) as typeof data;
        newData[key] = value;
        setData(newData);
    }

    async function handleSubmit() {
        if (isSubmitLoading || isCancelationLoading)
            return;

        try {
            setIsSubmitLoading(true);
            const response = await createNote({
                title: data.title,
                content: data.content,
                /*---*/
                targetId: channel.id,
                parentId: null,
                metadata: {},
            })
            await noteCreateMutate(response.note.targetId, response.note);
            toast({
                title: "Note Created",
                description: "If the note don't appear please refresh the page.",
                variant: "success"
            })
            closeForm();
        } catch (error) {
            const message = error && error.message ? error.message : "Failed to create the note, Please try again.";
            toast({
                title: "Operation Failed!",
                description: message,
                variant: "error"
            })
        } finally {
            setIsSubmitLoading(false);
        }

    }

    async function handleCancel() {
        if (isSubmitLoading || isCancelationLoading)
            return;

        try {
            setIsCancelationLoading(true);
            closeForm();
            setData(DEFAULT_DATA);
        } catch (error) {
            toast({
                title: "Operation Failed!",
                description: "Failed to cancel note creation operation, Please try again.",
                variant: "error"
            })
        } finally {
            setIsCancelationLoading(false);
        }
    }

    return (
        <div className="w-full flex flex-col">
            {
                !isFormOpen ?
                    (
                        <div className="w-full">
                            <Button className="w-full" onClick={openForm} variant="primary">Write Note</Button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col gap-2">
                                <div key={"channel-note-title"} className="w-full flex flex-col gap-y-1">
                                    <Label htmlFor={"channel-note-title"} className="text-ui-fg-subtle">
                                        {"Title"}
                                    </Label>
                                    <Input
                                        className="w-full"
                                        placeholder={"Title"}
                                        onChange={handleDataKeyValueChange.bind(null, "title")}
                                        id={"channel-note-title"}
                                    />
                                </div>
                                <div key={"channel-note-content"} className="w-full flex flex-col gap-y-1">
                                    <Label htmlFor={"channel-note-content"} className="text-ui-fg-subtle">
                                        {"Content"}
                                    </Label>
                                    <Textarea
                                        className="w-full max-h-64"
                                        placeholder={"Content"}
                                        onChange={handleDataKeyValueChange.bind(null, "content")}
                                        id={"channel-note-content"}
                                    />
                                </div>
                            </div>
                            <div className="w-full flex flex-row gap-2">
                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={handleCancel}
                                    disabled={isSubmitLoading}
                                    isLoading={isCancelationLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="primary"
                                    className="w-full"
                                    onClick={handleSubmit}
                                    disabled={isCancelationLoading}
                                    isLoading={isSubmitLoading}
                                >
                                    Create
                                </Button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ChannelsNotesModalCreateNote;