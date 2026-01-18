<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">用户登录</h2>
      <div class="form-group">
        <input
          v-model="username"
          type="text"
          class="input-field"
          placeholder="请输入用户名"
        />
      </div>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="input-field"
          placeholder="请输入密码"
        />
      </div>
      <button
        :disabled="loading"
        @click="handleLogin"
        class="login-button"
      >
        {{ loading ? '登录中...' : '登录' }}
      </button>
      <div v-if="message" class="message" :class="{ error: message.includes('失败') || message.includes('错误') }">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const message = ref('')
const loading = ref(false)

const handleLogin = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    message.value = '请输入用户名和密码'
    return
  }

  loading.value = true
  message.value = ''

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (data.code === 0) {
      localStorage.setItem('token', data.token)
      message.value = `欢迎，${username.value}！`
    } else {
      message.value = data.message || '登录失败，请重试'
    }
  } catch (error) {
    message.value = '请求失败，请检查网络'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 360px;
  padding: 32px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
  font-weight: 600;
}

.form-group {
  margin-bottom: 16px;
}

.input-field {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.input-field:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.login-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: #409eff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 8px;
}

.login-button:hover:not(:disabled) {
  background-color: #337ecc;
}

.login-button:disabled {
  background-color: #b3d1f7;
  cursor: not-allowed;
}

.message {
  margin-top: 16px;
  font-size: 14px;
  color: #67c23a; /* success green */
}

.message.error {
  color: #f56c6c; /* error red */
}
</style>