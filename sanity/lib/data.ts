import 'server-only'

import { serverSanityFetch } from './server-client'
import {
  allCoursesQuery,
  featuredCoursesQuery,
  courseBySlugQuery,
  lessonBySlugQuery,
  allInstructorsQuery,
  instructorBySlugQuery,
  allCategoriesQuery,
} from './queries'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Category {
  _id: string
  title: string
  slug: string
  description?: string
  coursesCount?: number
}

export interface Instructor {
  _id: string
  name: string
  slug: string
  photo?: SanityImage
  expertise?: string
  bio?: string
  coursesCount?: number
}

export interface Resource {
  _key: string
  type: 'github' | 'docs' | 'article' | 'pdf' | 'tool'
  title: string
  url: string
  description?: string
}

export interface LearningOutcome {
  _key: string
  icon?: string
  title: string
  description: string
}

export interface LessonSummary {
  _id: string
  title: string
  slug: string
  duration?: number
  freePreview?: boolean
  studentCount?: number
}

export interface ModuleData {
  _key: string
  title: string
  summary?: string
  lessons: LessonSummary[]
}

export interface CourseCardData {
  _id: string
  title: string
  slug: string
  summary: string
  coverImage?: SanityImage
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  price: number
  popular?: boolean
  studentCount?: number
  instructor: Instructor
  category: Category
  modulesCount: number
  lessonsCount: number
  totalDuration?: number
}

export interface CourseDetailData extends CourseCardData {
  learningOutcomes?: LearningOutcome[]
  modules: ModuleData[]
}

export interface LessonDetailData {
  _id: string
  title: string
  slug: string
  videoUrl?: string
  thumbnail?: SanityImage
  duration?: number
  freePreview?: boolean
  studentCount?: number
  notes?: unknown[]
  keyPoints?: string[]
  proTip?: string
  resources?: Resource[]
  course?: {
    _id: string
    title: string
    slug: string
    instructor: Instructor
    modules: {
      _key: string
      title: string
      summary?: string
      lessons: LessonSummary[]
    }[]
  }
}

/**
 * Format total duration in seconds into human-readable string (e.g. "18h 24m" or "45m").
 */
export function formatDuration(seconds?: number): string {
  if (!seconds || seconds <= 0) return '0m'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`.trim()
  }
  return `${minutes}m`
}

/**
 * Retrieve all courses for catalog and listings.
 */
export async function getAllCourses(): Promise<CourseCardData[]> {
  return serverSanityFetch<CourseCardData[]>({
    query: allCoursesQuery,
    tags: ['course'],
  })
}

/**
 * Retrieve featured courses for home page.
 */
export async function getFeaturedCourses(): Promise<CourseCardData[]> {
  return serverSanityFetch<CourseCardData[]>({
    query: featuredCoursesQuery,
    tags: ['course'],
  })
}

/**
 * Retrieve full course details by slug.
 */
export async function getCourseBySlug(slug: string): Promise<CourseDetailData | null> {
  return serverSanityFetch<CourseDetailData | null>({
    query: courseBySlugQuery,
    params: { slug },
    tags: [`course:${slug}`],
  })
}

/**
 * Retrieve lesson details by slug including parent course navigation.
 */
export async function getLessonBySlug(slug: string): Promise<LessonDetailData | null> {
  return serverSanityFetch<LessonDetailData | null>({
    query: lessonBySlugQuery,
    params: { slug },
    tags: [`lesson:${slug}`],
  })
}

/**
 * Retrieve all instructors.
 */
export async function getAllInstructors(): Promise<Instructor[]> {
  return serverSanityFetch<Instructor[]>({
    query: allInstructorsQuery,
    tags: ['instructor'],
  })
}

/**
 * Retrieve a single instructor by slug with authored courses.
 */
export async function getInstructorBySlug(
  slug: string
): Promise<(Instructor & { courses: CourseCardData[] }) | null> {
  return serverSanityFetch<(Instructor & { courses: CourseCardData[] }) | null>({
    query: instructorBySlugQuery,
    params: { slug },
    tags: [`instructor:${slug}`],
  })
}

/**
 * Retrieve all categories.
 */
export async function getAllCategories(): Promise<Category[]> {
  return serverSanityFetch<Category[]>({
    query: allCategoriesQuery,
    tags: ['category'],
  })
}
