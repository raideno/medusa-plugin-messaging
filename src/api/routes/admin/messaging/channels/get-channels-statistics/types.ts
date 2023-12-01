import { ChannelsStatisticsIntervals } from "../../../../../../services/medusa-plugin-messaging-channel";

export type EndpointRequestQueryParamsType = {
    startDate: Date;
    endDate: Date;
    interval: ChannelsStatisticsIntervals;
};

export type EndpointRequestBodyType = void;

export type EndpointResponseBodyType = {
    interval: ChannelsStatisticsIntervals;
    start: Date;
    end: Date;
    statistics: { datetime: string | Date; count: number }[];
};