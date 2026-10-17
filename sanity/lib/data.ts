import 'server-only'

import { serverSanityFetch } from './server-client'
import {
  allCoursesQuery,
  featuredCoursesQuery,
  courseBySlugQuery,
  lessonBySlugQuery,
  allLessonsSlugsQuery,
  allInstructorsQuery,
  instructorBySlugQuery,
  allCategoriesQuery,
} from './queries'

export * from './types'
export * from './format'

import type {
  Category,
  Instructor,
  CourseCardData,
  CourseDetailData,
  LessonDetailData,
} from './types'

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
 * Retrieve all lesson slugs for static generation.
 */
export async function getAllLessonSlugs(): Promise<{ slug: string }[]> {
  return serverSanityFetch<{ slug: string }[]>({
    query: allLessonsSlugsQuery,
    tags: ['lesson'],
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
