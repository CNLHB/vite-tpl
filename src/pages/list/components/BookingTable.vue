<template>
    <el-card shadow="never">
    <el-table :data="data" v-loading="loading" style="width: 100%">
      <el-table-column prop="submitTime" label="提交时间" width="180"></el-table-column>
      <el-table-column prop="status" label="预约状态" width="100"></el-table-column>
      <el-table-column label="渠道信息" width="250">
        <template #default="{ row }">
          <div>渠道名称: {{ row.channelInfo.name }}</div>
          <div>渠道id: {{ row.channelInfo.id }}</div>
          <div>子账号id: {{ row.channelInfo.subAccountId }}</div>
          <div>业务归属: {{ row.channelInfo.businessOwner }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="follower" label="跟进人" width="100"></el-table-column>
      <el-table-column label="商品名称" width="250">
        <template #default="{ row }">
          {{ row.productName }} (商品id: {{ row.productId }})
        </template>
      </el-table-column>
      <el-table-column prop="insuranceArea" label="投保区域" width="150"></el-table-column>
      <el-table-column prop="customerName" label="客户姓名" width="120"></el-table-column>
      <el-table-column prop="contactPhone" label="对接人手机号" width="150"></el-table-column>
      <el-table-column label="预约时间" width="250">
        <template #default="{ row }">
          <div v-for="(time, index) in row.bookingTimes" :key="index">
            {{ time }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="applicantUid" label="申请人uid" width="150"></el-table-column>
      <el-table-column prop="bookingResult" label="预约结果" width="120"></el-table-column>
      <el-table-column prop="lastOperator" label="最近操作人" width="120"></el-table-column>
      <el-table-column prop="operationTime" label="操作时间" width="180"></el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template #default="{ row }">
          <el-button type="text" @click="handleProcess(row)">处理</el-button>
          <el-button type="text" @click="handleCancel(row)">取消预约</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { BookingItem } from '../types';

defineProps<{ 
  data: BookingItem[];
  loading: boolean;
}>();

/**
 * @description 处理
 * @param {BookingItem} row - 行数据
 */
const handleProcess = (row: BookingItem) => {
  console.log('Process', row);
};

/**
 * @description 取消预约
 * @param {BookingItem} row - 行数据
 */
const handleCancel = (row: BookingItem) => {
  console.log('Cancel', row);
};
</script>