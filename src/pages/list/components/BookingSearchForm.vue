<template>
  <el-card shadow="never">
  <el-form :model="form" inline>
    <el-form-item label="渠道id">
      <el-input v-model="form.channelId" placeholder="渠道id"></el-input>
    </el-form-item>
    <el-form-item label="时间范围">
      <el-date-picker
        v-model="form.time"
        type="datetime"
        placeholder="Select date and time"
      />
    </el-form-item>
    <el-form-item label="渠道名称">
      <el-input v-model="form.channelName" placeholder="渠道名称"></el-input>
    </el-form-item>
    <el-form-item label="商品id">
      <el-input v-model="form.productId" placeholder="商品id"></el-input>
    </el-form-item>
    <el-form-item label="商品名称">
      <el-input v-model="form.productName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="双录人员id">
      <el-input v-model="form.dualRecorderId" placeholder="双录人员id"></el-input>
    </el-form-item>
    <el-form-item label="双录人员姓名">
      <el-input v-model="form.dualRecorderName" placeholder="双录人员姓名"></el-input>
    </el-form-item>
    <el-form-item label="业务归属">
      <el-select v-model="form.businessOwner" placeholder="请选择" style="width: 200px">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="跟进人">
      <el-select v-model="form.follower" placeholder="请选择" style="width: 200px">
        <el-option label="lillian" value="lillian"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="客户姓名">
      <el-input v-model="form.customerName" placeholder="客户姓名"></el-input>
    </el-form-item>
    <el-form-item label="预约状态">
      <el-select v-model="form.status" placeholder="请选择">
        <el-option label="待处理" value="pending"></el-option>
        <el-option label="已处理" value="processed"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import type { BookingSearchParams } from '../types';

const emits = defineEmits(['search']);

const form = ref<BookingSearchParams>({
  channelId: '',
  channelName: '',
  productId: '',
  productName: '',
  dualRecorderId: '',
  dualRecorderName: '',
  businessOwner: '',
  follower: '',
  customerName: '',
  status: '',
});

/**
 * @description 搜索
 */
const onSearch = () => {
  emits('search', form.value);
};

/**
 * @description 重置
 */
const onReset = () => {
  form.value = {};
  emits('search', form.value);
};
</script>