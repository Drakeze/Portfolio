require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({})

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...')
    
    // Test connection by attempting to query
    await prisma.$connect()
    console.log('✅ Successfully connected to MongoDB!')
    
    // Try to count projects
    const projectCount = await prisma.project.count()
    console.log(`📊 Found ${projectCount} project(s) in database`)
    
    // List all projects
    const projects = await prisma.project.findMany({
      select: {
        slug: true,
        title: true,
        status: true,
      }
    })
    
    if (projects.length > 0) {
      console.log('\n📁 Projects:')
      projects.forEach(p => console.log(`  - ${p.title} (${p.slug}) [${p.status}]`))
    } else {
      console.log('\n💡 No projects found. Database is empty but connection works!')
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
