import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { Project, ProjectStatus } from '@/types/project'

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const db = await getDb()
    const collection = db.collection<Project>('Project')

    // Get query params for filtering
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    // Build query
    const query: any = {}
    if (status) query.status = status
    if (category) query.category = category

    const projects = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const db = await getDb()
    const collection = db.collection<Project>('Project')

    const body = await request.json()

    // Validate required fields
    const requiredFields = ['slug', 'title', 'summary', 'heroImage', 'category']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if slug already exists
    const existing = await collection.findOne({ slug: body.slug })
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A project with this slug already exists' },
        { status: 409 }
      )
    }

    // Create new project
    const newProject: Omit<Project, '_id'> = {
      slug: body.slug,
      title: body.title,
      summary: body.summary,
      heroImage: body.heroImage,
      category: body.category,
      tags: body.tags || [],
      liveUrl: body.liveUrl,
      repoUrl: body.repoUrl,
      status: body.status || ProjectStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newProject as any)

    return NextResponse.json(
      {
        success: true,
        data: { _id: result.insertedId, ...newProject },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
