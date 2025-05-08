<script setup>
// 定义响应式数据
const data = ref([])
const error = ref(null)
const loading = ref(false)

// 获取数据的函数
const fetchData = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/test')
    const result = await response.json()
    console.log('result', result)
    if (result.status === 200) {
      data.value = result.data
    } else {
      error.value = result.error || '获取数据失败'
    }
  } catch (e) {
    error.value = '请求失败'
  } finally {
    loading.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>

    <!-- 加载状态显示 -->
    <div v-if="loading">正在加载数据...</div>

    <!-- 错误信息显示 -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- 数据显示 -->
    <div v-if="data.length > 0" class="data-container">
      <h2>数据列表</h2>
      <table>
        <thead>
          <tr>
            <th v-for="(value, key) in data[0]" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td v-for="(value, key) in item" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="!loading && !error">暂无数据</div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin: 10px 0;
}

.data-container {
  margin: 20px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>