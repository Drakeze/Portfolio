import { ObjectId } from 'mongodb'

export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT',
}

export enum StatMetric {
  VIEW = 'VIEW',
  DEPLOY = 'DEPLOY',
  STAR = 'STAR',
}

export enum Constraint {
  PUBLIC = 'PUBLIC',
  NDA = 'NDA',
  INTERNAL = 'INTERNAL',
}

export interface Project {
  _id: ObjectId
  slug: string
  title: string
  summary: string
  heroImage: string
  category: string
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  status: ProjectStatus
  createdAt: Date
  updatedAt: Date
}

export interface ProjectMetadata {
  _id: ObjectId
  projectId: ObjectId
  headline?: string
  techStack: string[]
  highlight?: string
  client?: string
  constraint?: Constraint
}

export interface ProjectStat {
  _id: ObjectId
  projectId: ObjectId
  metric: StatMetric
  value: number
  recordedAt: Date
}

// For creating new projects (without _id, createdAt, updatedAt)
export type CreateProjectInput = Omit<Project, '_id' | 'createdAt' | 'updatedAt'>

// For updating projects (all fields optional except _id)
export type UpdateProjectInput = Partial<Omit<Project, '_id' | 'createdAt' | 'updatedAt'>>
