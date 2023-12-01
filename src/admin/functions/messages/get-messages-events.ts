import {
    EndpointEventResponseBodyType
} from "../../../api/routes/admin/messaging/messages/get-messages-events/types"

import { BACKEND_URL } from "../index";
import MedusaPluginMessagingError from "../error";

export default async () => {
    const source = new EventSource(BACKEND_URL + "/admin/messaging/messages/events", {
        withCredentials: true
    });

    return new Promise<EventSource | null>((resolve, reject) => {
        source.onopen = (event) => {
            /**
             * TODO: in case there is an error after it got resolved, will it cause an error ?
             *       should we do (source.onopen = undefined; source.onerror = undefined;) before resolving or rejecting ?
             */
            source.onopen = undefined;
            source.onerror = undefined;
            resolve(source);
        }

        source.onerror = (event) => {
            /**
             * TODO: in case there is an error after it got resolved, will it cause an error ?
             *       should we do (source.onopen = undefined; source.onerror = undefined;) before resolving or rejecting ?
             */
            source.onopen = undefined;
            source.onerror = undefined;
            reject(null);
        }
    });
}