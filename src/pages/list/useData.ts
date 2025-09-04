import { ref, onMounted } from 'vue';
import type { BookingItem, BookingSearchParams } from './types';

/**
 * @description 模拟API获取预约列表
 * @param params 查询参数
 * @returns Promise<{
 *   list: BookingItem[];
 *   total: number;
 * }>
 */
const fetchBookingListApi = async (params: any): Promise<{ list: BookingItem[]; total: number }> => {
  console.log('Fetching data with params:', params);
  // 模拟数据
  const allData: BookingItem[] = [
    {
      submitTime: '2025-08-21 15:55:08',
      status: '待处理',
      channelInfo: {
        name: '创信小可爱测',
        id: '171164220',
        subAccountId: '17949',
        businessOwner: '皓月',
      },
      follower: 'lillian',
      productName: '海保人寿增多多8号增额终身寿险(庆典版)',
      productId: '178014',
      insuranceArea: '广东省-深圳市',
      customerName: '张三',
      contactPhone: '13800138000',
      bookingTimes: [
        '时间1: 2025-08-21 16:30:00',
        '时间2: 2025-08-21 19:00:00',
        '时间3: 2025-08-22 08:00:00',
      ],
      applicantUid: '174296952',
      bookingResult: '-',
      lastOperator: '-',
      operationTime: '2025-08-21 15:55:08',
    },
    {
      submitTime: '2025-08-21 15:37:05',
      status: '待处理',
      channelInfo: {
        name: '创信小可爱测',
        id: '171164220',
        subAccountId: '17949',
        businessOwner: '皓月',
      },
      follower: 'lillian',
      productName: '富德生命鑫禧年年尊享版养老年金保险_v3验证商',
      productId: '176096',
      insuranceArea: '北京市-市辖区',
      customerName: '带商品',
      contactPhone: '13900139000',
      bookingTimes: [
        '时间1: 2025-08-21 17:00:00',
        '时间2: 2025-08-21 18:00:00',
        '时间3: 2025-08-21 18:30:00',
      ],
      applicantUid: '172100409',
      bookingResult: '-',
      lastOperator: '-',
      operationTime: '2025-08-21 15:37:05',
    },
    {
      submitTime: '2025-08-21 15:35:49',
      status: '待处理',
      channelInfo: {
        name: '创信小可爱测',
        id: '171164220',
        subAccountId: '-',
        businessOwner: '皓月',
      },
      follower: 'lillian',
      productName: '富德生命鑫禧年年尊享版养老年金保险-保障方案一',
      productId: '175655',
      insuranceArea: '北京市-市辖区',
      customerName: '许瀛辉',
      contactPhone: '13246699025',
      bookingTimes: [
        '时间1: 2025-08-21 16:00:00',
        '时间2: 2025-08-21 16:00:00',
        '时间3: 2025-08-21 16:00:00',
      ],
      applicantUid: '172879985',
      bookingResult: '-',
      lastOperator: '-',
      operationTime: '2025-08-21 15:35:49',
    },
  ];

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ list: allData, total: allData.length });
    }, 500);
  });
};

/**
 * @description 预约列表数据管理
 * @returns {object} 包含列表数据、加载状态、分页信息和操作方法的对象
 */
export const useBookingData = () => {
  const bookingList = ref<BookingItem[]>([]);
  const loading = ref(false);
  const total = ref(0);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const searchParams = ref<BookingSearchParams>({});

  /**
   * @description 获取列表数据
   */
  const fetchList = async () => {
    loading.value = true;
    try {
      const res = await fetchBookingListApi({
        ...searchParams.value,
        page: currentPage.value,
        pageSize: pageSize.value,
      });
      bookingList.value = res.list;
      total.value = res.total;
    } catch (error) {
      console.error('Failed to fetch booking list:', error);
    } finally {
      loading.value = false;
    }
  };

  /**
   * @description 处理搜索
   * @param {BookingSearchParams} params - 搜索参数
   */
  const handleSearch = (params: BookingSearchParams) => {
    searchParams.value = params;
    currentPage.value = 1;
    fetchList();
  };

  /**
   * @description 处理页码改变
   * @param {number} page - 新页码
   */
  const handlePageChange = (page: number) => {
    currentPage.value = page;
    fetchList();
  };

  /**
   * @description 处理每页数量改变
   * @param {number} size - 新的每页数量
   */
  const handleSizeChange = (size: number) => {
    pageSize.value = size;
    currentPage.value = 1;
    fetchList();
  };

  onMounted(fetchList);

  return {
    bookingList,
    loading,
    total,
    currentPage,
    pageSize,
    handleSearch,
    handlePageChange,
    handleSizeChange,
  };
};