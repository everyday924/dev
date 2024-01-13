<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="main">
    <RouterView />
    <div class="footer">版权所有 https://github.com/everyday924/vue-project</div>
  </div>
</template>

<style scoped>
#main{
  width: 100%;
  height: 100%;
}
.footer {
  width: 100vw;
  color: white;
  position: fixed;
  bottom: 10px;
  text-align: center;
}
</style>