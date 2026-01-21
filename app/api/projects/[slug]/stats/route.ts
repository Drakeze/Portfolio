import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import { Project, ProjectStat, StatMetric } from '@/types/project'

type RouteContext = {
  params: Promise<{ slug: string }>
}

// POST /api/projects/[slug]/stats - Track a project stat (view, deploy, star)
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params
    const db = await getDb()
    const projectsCollection = db.collection<Project>('Project')
    const statsCollection = db.collection<ProjectStat>('ProjectStat')

    // Get the project
    const project = await projectsCollection.findOne({ slug })
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { metric } = body

    // Validate metric
    if (!metric || !Object.values(StatMetric).includes(metric)) {
      return NextResponse.json(
        { success: false, error: 'Invalid metric. Must be VIEW, DEPLOY, or STAR' },
        { status: 400 }
      )
    }

    // Create stat entry
    const newStat: Omit<ProjectStat, '_id'> = {
      projectId: project._id,
      metric: metric as StatMetric,
      value: 1,
      recordedAt: new Date(),
    }

    const result = await statsCollection.insertOne(newStat as any)

    return NextResponse.json(
      {
        success: true,
        data: { _id: result.insertedId, ...newStat },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error recording stat:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to record stat' },
      { status: 500 }
    )
  }
}

// GET /api/projects/[slug]/stats - Get project stats
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params
    const db = await getDb()
    const projectsCollection = db.collection<Project>('Project')
    const statsCollection = db.collection<ProjectStat>('ProjectStat')

    // Get the project
    const project = await projectsCollection.findOne({ slug })
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Get all stats for this project
    const stats = await statsCollection
      .find({ projectId: project._id })
      .sort({ recordedAt: -1 })
      .toArray()

    // Aggregate stats by metric
    const aggregated = stats.reduce(
      (acc, stat) => {
        acc[stat.metric] = (acc[stat.metric] || 0) + stat.value
        return acc
      },
      {} as Record<string, number>
    )

    return NextResponse.json({
      success: true,
      data: {
        total: stats.length,
        aggregated,
        recent: stats.slice(0, 10),
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
