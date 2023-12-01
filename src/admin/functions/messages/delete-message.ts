import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "../../../api/routes/admin/messaging/messages/delete-message/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async (channelId: string, sourceId: string, messageId: string, data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.delete(BACKEND_URL + `/admin/messaging/channels/${channelId}/sources/${sourceId}/messages/${messageId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while getting a message.", error.response.data);
        }
        throw error;
    }
}