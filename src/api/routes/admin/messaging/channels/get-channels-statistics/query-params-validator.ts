import { IsNumber, IsDate, IsDateString, IsEnum, IsString, IsOptional } from "class-validator";

import { EndpointRequestQueryParamsType } from "./types";
import { ChannelsStatisticsIntervals } from "../../../../../../services/medusa-plugin-messaging-channel";

export class QueryParamsValidator implements EndpointRequestQueryParamsType {
    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;

    @IsString()
    @IsEnum(ChannelsStatisticsIntervals)
    interval: ChannelsStatisticsIntervals;
}