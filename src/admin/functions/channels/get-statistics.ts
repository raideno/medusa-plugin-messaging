import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "../../../api/routes/admin/messaging/channels/get-channels-statistics/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async (data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.get(BACKEND_URL + `/admin/messaging/channels/statistics`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while getting channels statistics.", error.response.data);
        }
        throw error;
    }
}