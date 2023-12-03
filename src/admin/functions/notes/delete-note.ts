import axios from "axios";

import {
    EndpointRequestBodyType,
    EndpointResponseBodyType
} from "../../../api/routes/admin/messaging/notes/delete-note/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async (noteId: string, data: EndpointRequestBodyType): Promise<EndpointResponseBodyType> => {
    try {
        const response = await axios.delete(BACKEND_URL + `/admin/messaging/notes/${noteId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new MedusaPluginMessagingError("error while deleting a note.", error.response.data);
        }
        throw error;
    }
}