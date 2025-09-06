<template>
  <h1>home</h1>
  <router-link to="/list">list</router-link>
  <br />
  <div v-for="item in list" :key="item">{{ item }}</div>
  <router-link to="/account">account11</router-link>
  <br />
  <van-button @click="handleData">1111</van-button>
</template>
<script setup lang="ts">
import request from '@/api/request'
import { getCurrentInstance } from 'vue'
const list = ref([1, 2, 3])
onMounted(() => {
  request('/api/getList', { page: 1, pageSize: 10 }, {})
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err)
    })
})
const currentInstance = getCurrentInstance()
if (currentInstance) {
  // currentInstance.appContext.app.config.globalProperties
}
function handleData() {
  request('/api/getList', { page: 1, pageSize: 10 }, {})
    .then(res => {
      console.log('res', res)
    })
    .catch(err => {
      console.log('err', err)
    })
}
</script>

<style scoped>
h1 {
  color: bisque;
}
</style>
