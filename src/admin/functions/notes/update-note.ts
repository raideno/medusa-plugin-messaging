import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "../../../api/routes/admin/messaging/notes/update-note/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async (noteId: string, data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.put(BACKEND_URL + `/admin/messaging/notes/${noteId}`, data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while updating a note.", error.response.data);
        }
        throw error;
    }
}