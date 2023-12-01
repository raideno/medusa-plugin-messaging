import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType,
    EndpointRequestQueryParamsType,
} from "../../../api/routes/admin/messaging/messages/get-messages/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

const page = 0;

const page_szie = 10;

const options = {
    offset: page * page_szie,
    limit: page_szie,
}

export default async (channelId: string, sourceId: string, params: EndpointRequestQueryParamsType, data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.get(BACKEND_URL + `/admin/messaging/channels/${channelId}/sources/${sourceId}/messages`, {
            withCredentials: true,
            params: params
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while getting messages.", error.response.data);
        }
        throw error;
    }
}