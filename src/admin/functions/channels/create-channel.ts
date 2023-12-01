import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "../../../api/routes/admin/messaging/channels/create-channel/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async (data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.post(BACKEND_URL + `/admin/messaging/channels`, data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while creating a channel.", error.response.data);
        }
        throw error;
    }
}