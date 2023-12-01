import Source from "../../../../../../models/source";

// export enum ChannelSourceMessageEvents {
//     MESSAGE_CREATE = "MESSAGE_CREATE",
//     MESSAGE_UPDATE = "MESSAGE_UPDATE",
//     MESSAGE_DELETE = "MESSAGE_DELETE",
// };

/**
 * TODO: update name: string with constants
 */

export type EndpointEventResponseBodyType = {
    name: string;
    data: { source: Source; }
    /*
    oldMessage: Message;
    newMessage: Message;
    deletedMessage: Message;
    */
}

export type EndpointRequestBodyType = void;

export type EndpointResponseBodyType = void;