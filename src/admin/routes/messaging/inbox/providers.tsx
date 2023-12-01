import { MessagingInboxSourceContextProvider } from "../../../contexts/messaging-inbox-source-context";
import { MessagingInboxChannelsContextProvider } from "../../../contexts/messaging-inbox-channels-context";

type InboxPageProvidersProps = {
    children: React.ReactNode;
}

const InboxPageProviders = ({ children }: InboxPageProvidersProps) => {
    return (
        <MessagingInboxChannelsContextProvider>
            <MessagingInboxSourceContextProvider>
                {children}
            </MessagingInboxSourceContextProvider>
        </MessagingInboxChannelsContextProvider>
    )
}

export default InboxPageProviders;