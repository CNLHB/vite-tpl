<script setup lang="ts">
import { request } from '@xysfe/util'

onMounted(() => {
  request({
    url: '/getList',
    data: {
      page: 1,
      pageSize: 10,
    },
    method: 'get',
  })
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err)
    })
})
</script>

<template>
  <h1 class="card">
    account
    <van-button>1111</van-button>
    <img src="./images/btn_bg.png" alt="" />
    <router-link to="/">home</router-link>
  </h1>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
