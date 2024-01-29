<template>
    <div v-loading="loading" style="height: 600px">
      <iframe 
        :src="url" 
        scrolling="auto"
        frameborder="no" 
        style="width: 100%; height: 100%" 
       />
    </div>
  </template>
   
  <script setup lang="ts">
  import {ref, onMounted, watch} from 'vue'
  import {useRouter,useRoute} from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  const url = ref()
  const loading = ref(true)
//   const realHeight = ref()
  url.value = route.params.src
  
//   realHeight.value = document.documentElement.clientHeight - 94.5 + "px;"
 
  onMounted(()=>{
    setTimeout(() => { loading.value = false; }, 100);  

    // window.addEventListener("resize", () => {   // 监听页面尺寸变化
    //     realHeight.value = document.documentElement.clientHeight - 94.5 + "px;";
    // })

  })
  </script>