export default defineEventHandler(async (event) => {
  const baseUrl = useRuntimeConfig().public.apiBaseUrl;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时

    console.log('开始请求，baseUrl:', baseUrl);
    try {
      const requestUrl = baseUrl + '/api/beverages';
      console.log('完整请求URL：', requestUrl);
      const response = await fetch(baseUrl + '/api/beverages', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      return {
        status: 200,
        data: result
      };
    } catch (error: any) {
      console.error('详细错误信息：', {
        name: error.name,
        message: error.message,
        cause: error.cause
      });
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error: any) {
    console.error('D1 查询错误：', error);

    // 返回本地测试数据
    if (error.name === 'AbortError' || error.cause?.code === 'ETIMEDOUT') {
      console.log('使用本地测试数据');
      return {
        status: 200,
        data: [
          {
            id: 1,
            name: "本地测试数据",
            description: "连接超时时的备用数据"
          }
        ]
      };
    }

    return {
      status: 500,
      error: 'D1数据库查询失败',
      message: error.message
    };
  }
});