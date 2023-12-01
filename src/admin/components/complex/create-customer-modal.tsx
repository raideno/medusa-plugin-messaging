import { useMedusa } from "medusa-react"
import { useState, ChangeEvent } from "react";

import { Button, FocusModal, Input, Label, useToast, useToggleState } from "@medusajs/ui";
import TitleTypography from "../typography/title";
import BodyTypography from "../typography/body";

type Data = {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    phone: string,
}

const DEFAULT_DATA: Data = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone: "",
}

type CreateCustomerModalProps = {
    children: React.ReactNode;
}

const CreateCustomerModal = ({
    children: trigger
}: CreateCustomerModalProps) => {

    const { toast } = useToast();

    const { client } = useMedusa();

    const { state, close: closeModal, open: openModal, toggle } = useToggleState(false);

    const [data, setData] = useState<Data>(DEFAULT_DATA);

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isCancelLoading, setIsCancelLoading] = useState<boolean>(false);

    const fields: { id: (keyof typeof data), name: string, type: "text" | "password" | "email" }[] = [
        { id: "email", name: "Email", type: "email" },
        { id: "first_name", name: "First Name", type: "text" },
        { id: "last_name", name: "Last Name", type: "text" },
        { id: "password", name: "password", type: "password" },
        { id: "phone", name: "Phone", type: "text" },
    ];

    function handleDataKeyValueChange(key: keyof typeof data, event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        const newData = JSON.parse(JSON.stringify(data)) as typeof data;
        newData[key] = value;
        setData(newData);
    }

    async function handleSubmit() {
        if (isSubmitLoading || isCancelLoading)
            return;

        try {
            setIsSubmitLoading(true);
            const customer = await client.customers.create(data);
            toast({
                variant: "success",
                title: "Created Customer.",
                description: "If changes don't appear, please refresh the page."
            });
            closeModal();
        } catch (error) {
            console.log(error, "error")
            const message = error && error.message ? error.message : "Failed to created the customer, please try again."
            toast({
                variant: "error",
                title: "Operation Failed.",
                description: message,
            });
        } finally {
            setIsSubmitLoading(false);
        }
    }

    async function handleCancel() {
        if (isSubmitLoading || isCancelLoading)
            return;

        setIsCancelLoading(true);

        try {

            closeModal();
        } catch (error) {

        } finally {
            setIsCancelLoading(false);
        }
    }

    function handleOpenChange(isOpen: boolean) {
        if (isSubmitLoading || isCancelLoading)
            return;

        if (isOpen)
            openModal();
        else
            closeModal()
    }

    return (
        <FocusModal open={state} onOpenChange={handleOpenChange}>
            <FocusModal.Trigger asChild>
                {trigger}
            </FocusModal.Trigger>
            <FocusModal.Content>
                <FocusModal.Header>
                    <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isCancelLoading}
                        isLoading={isSubmitLoading}
                    >
                        Create
                    </Button>
                </FocusModal.Header>
                <FocusModal.Body className="flex flex-col items-center py-16">
                    <div className="flex w-full max-w-lg flex-col gap-y-8 h-full max-h-full">
                        <div className="flex flex-col gap-y-1">
                            <TitleTypography weight="bold">Create Customer</TitleTypography>
                            <BodyTypography className="text-ui-fg-subtle">
                                Create a customer directly from the admin dashboard, you can make it as registered or not.
                            </BodyTypography>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            {fields.map((field) => {
                                return (
                                    <div key={"create-customer-fields-field-" + field.id} className="flex flex-col gap-y-1">
                                        <Label htmlFor={"create-customer-fields-field-" + field.id} className="text-ui-fg-subtle">
                                            {field.name}
                                        </Label>
                                        <Input
                                            placeholder={field.name}
                                            onChange={handleDataKeyValueChange.bind(null, field.id)}
                                            id={"create-customer-fields-field-" + field.id}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-full">
                            <Button
                                className="w-full"
                                variant="primary"
                                onClick={handleSubmit}
                                disabled={isCancelLoading}
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

export default CreateCustomerModal;