import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export default defineEventHandler(async (event) => {
  try {
    // 获取数据库连接
    const client = await pool.connect()
    
    try {
      // 执行查询
      const result = await client.query('SELECT * FROM users limit 10')
      
      return {
        status: 200,
        data: result.rows
      }
    } finally {
      // 释放连接回连接池
      client.release()
    }
  } catch (error: any) {
    // 错误处理
    return {
      status: 500,
      error: '数据库查询失败',
      message: error.message
    }
  }
})