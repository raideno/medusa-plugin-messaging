import { camelCase as lodashCamelCase, startCase as lodashStartCase } from "lodash";

import { useEffect, useState, ChangeEvent } from "react";

import Customer from "../../../types/customer";

import { useMedusa } from "medusa-react"
import { Avatar, Button, FocusModal, Input, Select, StatusBadge, useToast, useToggleState } from "@medusajs/ui";
import TitleTypography from "../typography/title";
import BodyTypography from "../typography/body";
import SmallTypography from "../typography/small";
import { Link } from "react-router-dom";
import Skeleton from "../ui/skeleton";
import createChannel from "../../functions/channels/create-channel";
import { channelCreateMutate } from "../../hooks/channels";

type Filter = {
    search: string;
    key: 'email' | 'id' | 'last_name' | 'first_name' | 'phone';
}

const FILTER_KEYS: (Filter["key"])[] = ["email", "id", "first_name", "last_name", "phone"];

const DEFAULT_FILTER: Filter = {
    key: "email",
    search: "",
}

type CreateChannelModalProps = {
    children: React.ReactNode;
}

const CreateChannelModal = ({
    children: trigger
}: CreateChannelModalProps) => {

    const { client } = useMedusa();

    const { toast } = useToast();

    const { state: isModalOpen, close: closeModal, open: openModal } = useToggleState(false);

    const [filter, setFilter] = useState<Filter>(DEFAULT_FILTER);

    const [customers, setCustomers] = useState<Customer[]>([]);

    const [isCustomersFetchLoading, setIsCustomersFetchLoading] = useState<boolean>(true);
    const [isCustomersFetchError, setIsCustomersFetchError] = useState<boolean>(false);

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
    const [isSubmitError, setIsSubmitError] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setIsCustomersFetchLoading(true);

            try {
                const response = await client.admin.customers.list();
                setCustomers(response.customers);
            } catch {
                toast({
                    variant: "error",
                    title: "Error !",
                    description: "Something went wrong while trying to load customers, Please try again."
                })
                setIsCustomersFetchError(true);
            } finally {
                setIsCustomersFetchLoading(false);
            }

        })()
    }, []);

    async function handleCustomerSelect(customerId: string) {
        if (isSubmitLoading)
            return;

        try {
            setIsSubmitLoading(true);
            setIsSubmitError(false);
            const response = await createChannel({
                customerId: customerId,
                metadata: {
                    createdFrom: "Admin Dashboard.",
                    createdBy: "<authenticated_user>"
                }
            });
            await channelCreateMutate(response.channel);
            toast({
                variant: "success",
                title: "Channel Created",
                description: "If Changes don't appear please refresh the page."
            })
        } catch (error) {
            const message = error && error.message ? error.message : "Failed to create channel for unknown reason, Try again.";
            toast({
                variant: "error",
                title: "Operation Failed !",
                description: message
            })
            setIsSubmitError(true);
        } finally {
            setIsSubmitLoading(false);
        }
    }

    function handleFilterSearchValueChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        const newFilter = JSON.parse(JSON.stringify(filter)) as typeof filter;
        newFilter["search"] = value;
        setFilter(newFilter);
    }

    function handleFilterKeyValueChange(newKey: typeof filter["key"]) {
        const newFilter = JSON.parse(JSON.stringify(filter)) as typeof filter;
        newFilter["key"] = newKey;
        setFilter(newFilter);
    }

    async function handleCustomersFetchReTry() {

    }

    function handleIsModalOpenChange(isOpen: boolean) {
        if (isSubmitLoading)
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
                    {/* <Button variant="primary">Create</Button> */}
                </FocusModal.Header>
                <FocusModal.Body className="flex flex-col items-center py-16">
                    <div className="flex w-full max-w-lg flex-col gap-y-8 h-full max-h-full">
                        <div className="flex flex-col gap-y-1">
                            <TitleTypography weight="bold">Create Customer's Channel</TitleTypography>
                            <BodyTypography className="text-ui-fg-subtle">
                                Create a Channel for one of your customers and start chatting with him.
                            </BodyTypography>
                        </div>
                        <div className="w-full flex flex-row items-center gap-2">
                            <Select
                                size="small"
                                value={filter.key}
                                onValueChange={handleFilterKeyValueChange}
                            >
                                <Select.Trigger>
                                    <Select.Value placeholder="Filter Key" />
                                </Select.Trigger>
                                <Select.Content>
                                    {FILTER_KEYS.map((filter_key) => (
                                        <Select.Item key={filter_key} value={filter_key}>
                                            {lodashStartCase(lodashCamelCase(filter_key))}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select>
                            <Input
                                size="small"
                                type="search"
                                value={filter.search}
                                onChange={handleFilterSearchValueChange}
                                placeholder={`Search on Customer's ${filter.key}`}
                            />
                        </div>
                        {
                            (() => {
                                if (isCustomersFetchLoading)
                                    return (
                                        <div className="flex flex-col gap-y-2">
                                            {new Array(12).map((_, i) => {
                                                return (
                                                    <Skeleton className="w-full rounded" />
                                                )
                                            })}
                                        </div>
                                    )

                                if (isCustomersFetchError || !customers)
                                    return (
                                        <div className="h-full flex flex-col items-center justify-center gap-2">
                                            <SmallTypography className="text-center">Somthing Went Wrong while Fetching Customers, Please Try Again.</SmallTypography>
                                            <Button onClick={handleCustomersFetchReTry} variant="primary">Try Again</Button>
                                        </div>
                                    )

                                if (customers.length === 0)
                                    return (
                                        <div className="h-full flex flex-col items-center justify-center gap-2">
                                            <SmallTypography className="text-center">No Customers Available.</SmallTypography>
                                            <Link to={"/a/customers"}>
                                                <Button variant="primary">Create Customer</Button>
                                            </Link>
                                        </div>
                                    )

                                return (
                                    <div className="flex flex-col gap-y-2">
                                        {customers.map((customer) => {
                                            return (
                                                <div
                                                    key={"create-customer-channel-customers-list-" + customer.id}
                                                    className="w-full p-2 flex flex-row items-center justify-between rounded-md cursor-pointer border border-grey-20 transition-all hover:opacity-75 active:opacity-50 hover:border-grey-30"
                                                    onClick={handleCustomerSelect.bind(null, customer.id)}
                                                >
                                                    <div className="flex flex-row items-center gap-2">
                                                        <div>
                                                            <Avatar
                                                                fallback={customer.first_name[0] + customer.last_name[0]}
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <BodyTypography weight="semibold">{customer.email}</BodyTypography>
                                                            <div className="flex flex-row items-center gap-1">
                                                                <SmallTypography>{customer.first_name}</SmallTypography>
                                                                <SmallTypography>{customer.last_name}</SmallTypography>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <StatusBadge color={customer.channelId ? "red" : "grey"}>{customer.channelId ? "Have a Channel" : "Don't Have a Channel"}</StatusBadge>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })()
                        }
                    </div>
                </FocusModal.Body>
            </FocusModal.Content >
        </FocusModal >
    )
}

export default CreateChannelModal;