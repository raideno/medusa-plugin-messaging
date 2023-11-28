import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "@api/routes/admin/messaging/channels/delete-channel/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "functions/error";

export default async (channelId: string, data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.delete(BACKEND_URL + `/admin/messaging/channels/${channelId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while getting a channel.", error.response.data);
        }
        throw error;
    }
}