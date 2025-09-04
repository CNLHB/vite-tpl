<script setup lang="ts">

</script>

<template>
    <div>
        <admin-container >
          <router-view  class="app-container" />
        </admin-container>
    </div>
</template>

<style scoped>
.app-container{
  background: #F1F3FA;
  padding: 30px;
  min-height: 100%;
}
</style>