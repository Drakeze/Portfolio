import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { Project } from '@/types/project'

type RouteContext = {
  params: Promise<{ slug: string }>
}

// GET /api/projects/[slug] - Get a single project by slug
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params
    const db = await getDb()
    const collection = db.collection<Project>('Project')

    const project = await collection.findOne({ slug })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: project,
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[slug] - Update a project
export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params
    const db = await getDb()
    const collection = db.collection<Project>('Project')

    const body = await request.json()

    // Don't allow updating _id, slug, createdAt
    delete body._id
    delete body.slug
    delete body.createdAt

    // Add updatedAt timestamp
    body.updatedAt = new Date()

    const result = await collection.findOneAndUpdate(
      { slug },
      { $set: body },
      { returnDocument: 'after' }
    )

    if (!result) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[slug] - Delete a project
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params
    const db = await getDb()
    const collection = db.collection<Project>('Project')

    const result = await collection.deleteOne({ slug })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
