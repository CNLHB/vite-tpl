<template>
  <h1>home</h1>
  <router-link to="/list">list</router-link>
  <br />
  <div v-for="item in list" :key="item">{{ item }}</div>
  <router-link to="/account">account11</router-link>
</template>
<script setup lang="ts">
import request from '@/api/request'
import { getCurrentInstance } from 'vue'
const list = ref([1, 2, 3])
const list1 = 1
const list2 = 1
const list3 = 1
onMounted(() => {
  request({
    url: '/api/getList',
    param: {},
  })
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
</script>

<style scoped>
h1 {
  color: bisque;
}
</style>
