import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "../../../api/routes/admin/messaging/sources/get-sources/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async (channelId: string, data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.get(BACKEND_URL + `/admin/messaging/channels/${channelId}/sources`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while getting sources.", error.response.data);
        }
        throw error;
    }
}