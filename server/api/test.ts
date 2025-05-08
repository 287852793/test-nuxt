import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default defineEventHandler(async (event) => {
  try {
    // 执行查询
    const result = await sql`SELECT * FROM users limit 10`
    
    return {
      status: 200,
      data: result
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