require('dotenv').config()
const { MongoClient } = require('mongodb')

async function testMongoDB() {
  const client = new MongoClient(process.env.DATABASE_URL)
  
  try {
    console.log('🔄 Connecting to MongoDB Atlas...')
    await client.connect()
    console.log('✅ Successfully connected to MongoDB!')
    
    const db = client.db('portfolio')
    const collections = await db.listCollections().toArray()
    
    console.log(`\n📊 Database: portfolio`)
    console.log(`📁 Collections (${collections.length}):`)
    collections.forEach(c => console.log(`  - ${c.name}`))
    
    // Try to count documents in Project collection
    const projectsCollection = db.collection('Project')
    const count = await projectsCollection.countDocuments()
    console.log(`\n✨ Projects in database: ${count}`)
    
    if (count > 0) {
      const projects = await projectsCollection.find({}).limit(5).toArray()
      console.log('\n📝 Sample projects:')
      projects.forEach(p => console.log(`  - ${p.title} (${p.slug})`))
    }
    
  } catch (error) {
    console.error('❌ Connection failed:')
    console.error(`  Error: ${error.message}`)
    if (error.code) console.error(`  Code: ${error.code}`)
    process.exit(1)
  } finally {
    await client.close()
    console.log('\n👋 Connection closed')
  }
}

testMongoDB()
