<template>
    <h1>home</h1>
        <router-link to="/list">list</router-link>
      <br>
        <router-link to="/account">account11</router-link>
</template>

<script setup lang="ts">
import request from '@/api/request';
onMounted(()=>{
  request({
    url: '/api/getList',
    param: {
      a: 1,
      b: 2
    }
  }).then(res=>{
    console.log('res', res);
    
  }).catch(err=>{
    console.log('err', err);
  })
})
import { getCurrentInstance } from 'vue';
  const currentInstance = getCurrentInstance()
  if(currentInstance){
    // currentInstance.appContext.app.config.globalProperties
  }
</script>



<style scoped>
h1{
  color: bisque;
}
</style>
