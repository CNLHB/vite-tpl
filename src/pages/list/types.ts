/**
 * @description 渠道信息
 */
export interface ChannelInfo {
  name: string;
  id: string;
  subAccountId: string;
  businessOwner: string;
}

/**
 * @description 预约项
 */
export interface BookingItem {
  submitTime: string;
  status: string;
  channelInfo: ChannelInfo;
  follower: string;
  productName: string;
  productId: string;
  insuranceArea: string;
  customerName: string;
  contactPhone: string;
  bookingTimes: string[];
  applicantUid: string;
  bookingResult: string;
  lastOperator: string;
  operationTime: string;
}

/**
 * @description 搜索参数
 */
export interface BookingSearchParams {
  channelId?: string;
  channelName?: string;
  productId?: string;
  productName?: string;
  dualRecorderId?: string;
  dualRecorderName?: string;
  businessOwner?: string;
  follower?: string;
  customerName?: string;
  status?: string;
}