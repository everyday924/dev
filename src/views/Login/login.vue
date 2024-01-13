<template>
  <div class="container">
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      :options="options"
    />
    <div class="login-box">
      <h1 class="title">欢迎登录</h1>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="user">
          <el-input 
          v-model="ruleForm.user" 
          autocomplete="off" 
          placeholder="用户名"
          :prefix-icon="User"
          size="large" />
        </el-form-item>
        <el-form-item label="" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            placeholder="密码"
            :prefix-icon="Lock"
            size="large"
            show-password
          />

        </el-form-item>
        <el-form-item label="" prop="captcha">
          <el-input v-model="ruleForm.captcha"  placeholder="验证码"
          :prefix-icon="Key"
          :maxlength="4"
          size="large" />
          <el-image 
            class="captcha"
            fit="cover"
            :src="captchaImg"
            @click="getYzm()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
          size="large"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'
import { option }  from './option'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { User,Lock,Key } from '@element-plus/icons-vue'
import { userReg, passReg }  from '@/common/verifyTool'
import { getPic, checkPic, userLogin } from '@/http/api/login'

const router = useRouter();

// 粒子背景
const particlesInit = async (engine:Engine) => {
  await loadSlim(engine)
}
const particlesLoaded = async (container:any) => {
  console.log('Particles container loaded', container)
}
const options = reactive(option)


// 登录表单
const ruleFormRef = ref<FormInstance>()

const checkCaptcha = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  } else {
     callback()
  }
}

const validateUser = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!userReg.test(value)) {
    callback(new Error('用户名4到16位（字母，数字，下划线，减号）'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!passReg.test(value)) {
    callback(new Error('密码至少包含 数字和英文，长度6-20'))
  }  else {
    callback()
  }
}

const ruleForm = reactive({
  user: '',
  checkPass: '',
  captcha: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  user: [{ validator: validateUser, trigger: 'blur' }],
  checkPass: [{ validator: validatePass, trigger: 'blur' }],
  captcha: [{ validator: checkCaptcha, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const ruleFormData = {...ruleForm}
      console.log(ruleFormData,'submit!')
      // 接口返回缺少参数，暂时不判断
      // const data = await checkPic({code: ruleForm.captcha, key})
      // if(data.data.code == 200) { //验证图片成功
      //   // 登录接口
      //   const loginData = await userLogin({
      //     deviceId: 'deviceId', //登录设备id,自定义
      //     deviceName: 'deviceName', //登录设备名称,自定义
      //     pwd: ruleFormData.checkPass, //登录密码
      //     username: ruleFormData.user, //登录用户名
      //   })
      //   if(loginData.data.code == 200) {
      //     // 跳转首页
      //     router.push({ path: "/" })
      //   } else {
      //     // ElMessage.error(JSON.stringify(data.data.msg))
      //   }
      //   // 获取用户信息
      //   // 获取token
      //   // 跳转首页
      // } else {
      //   // ElMessage.error(JSON.stringify(data.data.msg))
      // }
      
      // 跳转首页保存token
      router.push({ path: "/" })
      window.sessionStorage.setItem('token', '111')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

// 验证码图片获取
let captchaImg = ref<String>();
let key:string = JSON.stringify(new Date().getTime());
const getYzm = async () => {
  const data = await getPic({ key })
  if(data.status === 200) {
      captchaImg.value = data.request.responseURL
  }
};getYzm();

</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .login-box {
    background: white;
    width: 360px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -180px;
    margin-top: -200px;
    box-shadow: rgba(0, 0, 0, 0.447) 15px 5px 10px;
    box-sizing: border-box;
    padding: 20px;
    .title {
      text-align: center;
      padding: 10px 0;
    }
    .el-button {
      width: 100%;
    }
    .captcha {
      width: 100px;
      height: 100%;
      margin-left: 15px;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.157);
    }
    :deep(.el-form-item) {
      .el-form-item__content {
        flex-wrap: nowrap;
      }
    }
  }
 
}
</style>