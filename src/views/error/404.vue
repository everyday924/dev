<template>
  <div class="wrap">
    <el-image  class="img" fit="cover" :src="img404"></el-image>
    <div>
        <h1>404错误！你访问的页面不存在(＃°Д°)</h1>
        <router-link to="/"><el-button type="primary" round class="btn">返回首页</el-button></router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import img404 from "@/assets/404.jpg";
</script>

<style lang="scss" scoped>
.wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
        width: 500px;
    }
    .btn {
        width: 120px;height: 40px;font-size: 18px;
        margin-top: 20px;
    }
}
</style>