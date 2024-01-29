<template>
    <div class="search">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名称">
            <el-input v-model="formInline.user" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="角色标识">
            <el-select
                v-model="formInline.region"
                placeholder="请选择"
                clearable
            >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
            </el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="default">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  
  const formInline = reactive({
    user: '',
    region: '',
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }
  </script>
  
  <style>
  
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }
  
  .demo-form-inline .el-select {
    --el-select-width: 220px;
  }

  .search {
  }
  </style>
  