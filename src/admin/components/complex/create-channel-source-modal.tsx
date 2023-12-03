import { useState, ChangeEvent } from "react";

import { Button, FocusModal, Input, Label, Textarea, useToast, useToggleState } from "@medusajs/ui";

import Channel from "../../../types/channel";

import createSource from "../../functions/sources/create-source";
import TitleTypography from "../typography/title";
import BodyTypography from "../typography/body";
import { sourceCreateMutate } from "../../hooks/sources";

type Data = {
    channelId: string;
    context: string;
    name: string;
    externalId?: string;
    handlerId?: string;
    metadata?: Record<string, unknown>;
}

const DEFAULT_DATA: Data = {
    name: "",
    channelId: "",
    context: "",
    // externalId: "",
    // handlerId: "",
    // metadata: {},
}

type CreateChannelSourceModalProps = {
    children: React.ReactNode;
    channel: Channel;
}

const CreateChannelSourceModal = ({
    children: trigger,
    channel
}: CreateChannelSourceModalProps) => {

    const { toast } = useToast();

    const { state: isModalOpen, close: closeModal, open: openModal } = useToggleState(false);

    const [data, setData] = useState<Data>({
        ...DEFAULT_DATA,
        channelId: channel.id
    });

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isCancelationLoading, setIsCancelationLoading] = useState<boolean>(false);

    function handleDataKeyValueChange(key: keyof Pick<typeof data, "name" | "context">, event: ChangeEvent<HTMLInputElement>) {
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
            const response = await createSource(channel.id, {
                ...data,
                channelId: channel.id
            })
            await sourceCreateMutate(channel.id, response.source);
            toast({
                variant: "success",
                title: "Source Created!",
                description: "If changes don't appear please refresh the page.",
            })
            closeModal();
        } catch (error) {
            const message = error && error.message ? error.message : "Failed to create a source, please try again."
            toast({
                variant: "error",
                title: "Operation Failed !",
                description: message,
            })
        } finally {
            setIsSubmitLoading(false);
        }
    }

    async function handleCancelation() {
        if (isSubmitLoading || isCancelationLoading)
            return;

        try {
            setIsCancelationLoading(true);
        } catch (error) {

        } finally {
            setIsCancelationLoading(false);
        }
    }

    function handleIsModalOpenChange(isOpen: boolean) {
        if (isSubmitLoading || isCancelationLoading)
            return;

        if (isOpen)
            openModal();
        else
            closeModal();
    }

    return (
        <FocusModal open={isModalOpen} onOpenChange={handleIsModalOpenChange}>
            <FocusModal.Trigger asChild>
                {trigger}
            </FocusModal.Trigger>
            <FocusModal.Content>
                <FocusModal.Header>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isCancelationLoading}
                        isLoading={isSubmitLoading}
                    >
                        Create
                    </Button>
                </FocusModal.Header>
                <FocusModal.Body className="flex flex-col items-center py-16">
                    <div className="flex w-full max-w-lg flex-col gap-y-8 h-full max-h-full">
                        <div className="flex flex-col gap-y-1">
                            <TitleTypography weight="bold">Create Channel's Source</TitleTypography>
                            <BodyTypography className="text-ui-fg-subtle">
                                Create a Source for a given customer channel and start chatting with him.
                            </BodyTypography>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <div key={"channel-source-name"} className="flex flex-col gap-y-1">
                                <Label htmlFor={"channel-source-name"} className="text-ui-fg-subtle">
                                    {"Name"}
                                </Label>
                                <Input
                                    placeholder={"Name"}
                                    onChange={handleDataKeyValueChange.bind(null, "name")}
                                    id={"channel-source-name"}
                                />
                            </div>
                            <div key={"channel-source-context"} className="flex flex-col gap-y-1">
                                <Label htmlFor={"channel-source-context"} className="text-ui-fg-subtle">
                                    {"Context"}
                                </Label>
                                <Textarea
                                    className="max-h-64"
                                    placeholder={"Context"}
                                    onChange={handleDataKeyValueChange.bind(null, "context")}
                                    id={"channel-source-context"}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <Button
                                className="w-full"
                                variant="primary"
                                onClick={handleSubmit}
                                disabled={isCancelationLoading}
                                isLoading={isSubmitLoading}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </FocusModal.Body>
            </FocusModal.Content>
        </FocusModal>
    )
}

export default CreateChannelSourceModal;