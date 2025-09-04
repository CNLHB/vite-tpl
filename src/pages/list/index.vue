<template>
  <div class="page-container">
    <BookingSearchForm @search="handleSearch" />
    <BookingTable :data="bookingList" :loading="loading" />
    <el-pagination
      background
      layout="prev, pager, next, sizes"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import BookingSearchForm from './components/BookingSearchForm.vue';
import BookingTable from './components/BookingTable.vue';
import { useBookingData } from './useData';

const {
  bookingList,
  loading,
  total,
  currentPage,
  pageSize,
  handleSearch,
  handlePageChange,
  handleSizeChange,
} = useBookingData();
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.el-pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
