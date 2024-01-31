<template>
  <div class="wrap">
    <el-image  class="img" fit="cover" :src="img403"></el-image>
    <div>
        <h1>403错误！暂无访问权限\(￣︶￣*\)</h1>
        <router-link to="/"><el-button type="primary" round class="btn">返回首页</el-button></router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import img403 from "@/assets/403.jpg";
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