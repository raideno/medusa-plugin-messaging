import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "../../../api/routes/admin/messaging/sources/create-source/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async (channelId: string, data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.post(BACKEND_URL + `/admin/messaging/channels/${channelId}/sources`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while creating a source.", error.response.data);
        }
        throw error;
    }
}