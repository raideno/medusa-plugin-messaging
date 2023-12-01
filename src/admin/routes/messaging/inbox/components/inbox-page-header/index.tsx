import { ArrowLeftMini, Plus } from "@medusajs/icons";
import { Button, IconButton, Tooltip } from "@medusajs/ui";

import CreateChannelModal from "../../../../../components/complex/create-channel-modal";

import InboxPageHeaderChannelsSearchInput from "./inbox-page-header-channels-search-input";
import { Link } from "react-router-dom";

type InboxPageHeaderProps = {}

const InboxPageHeader = ({ }: InboxPageHeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-2 p-4 h-32 justify-between">
            <div className="w-full flex flex-row items-center justify-between">
                <Link to={"/a/messaging"}>
                    <Button variant="secondary">
                        <ArrowLeftMini />
                        Go Back
                    </Button>
                </Link>
                {/* <Tooltip content="Create a Channel"> */}
                <CreateChannelModal>
                    <IconButton variant="primary">
                        <Plus />
                    </IconButton>
                </CreateChannelModal>
                {/* </Tooltip> */}
            </div>
            <InboxPageHeaderChannelsSearchInput />
        </div>
    )
}

export default InboxPageHeader;