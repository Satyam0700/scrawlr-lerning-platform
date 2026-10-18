import { defineQuery } from 'next-sanity'

/**
 * Query to fetch all courses for the catalog and home page listing.
 * Projects resolved category, instructor, module counts, and total lesson duration.
 */
export const allCoursesQuery = defineQuery(`
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    "modulesCount": count(modules),
    "lessonsCount": count(modules[].lessons[]),
    "totalDuration": math::sum(modules[].lessons[]->duration)
  }
`)

/**
 * Query to fetch featured/popular courses.
 */
export const featuredCoursesQuery = defineQuery(`
  *[_type == "course" && (popular == true || count(modules) > 0)] | order(popular desc, _createdAt desc)[0...6] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    "modulesCount": count(modules),
    "lessonsCount": count(modules[].lessons[]),
    "totalDuration": math::sum(modules[].lessons[]->duration)
  }
`)

/**
 * Query to fetch full details of a single course by its slug.
 * Expands modules and ordered lesson references.
 */
export const courseBySlugQuery = defineQuery(`
  *[_type == "course" && (slug.current == $slug || ($slug == "nextjs-for-production" && slug.current == "nextjs-app-router-in-depth"))][0] {
    _id,
    title,
    "slug": slug.current,
    summary,
    coverImage,
    level,
    price,
    popular,
    studentCount,
    learningOutcomes[]{
      _key,
      icon,
      title,
      description
    },
    instructor->{
      _id,
      name,
      "slug": slug.current,
      photo,
      expertise,
      bio
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description
    },
    modules[]{
      _key,
      title,
      summary,
      "duration": math::sum(lessons[]->duration),
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        freePreview,
        studentCount
      }
    },
    "modulesCount": count(modules),
    "lessonsCount": count(modules[].lessons[]),
    "totalDuration": math::sum(modules[].lessons[]->duration)
  }
`)

/**
 * Query to fetch a lesson by slug, including reverse-lookup of its parent course and modules.
 */
export const lessonBySlugQuery = defineQuery(`
  *[_type == "lesson" && (
    slug.current == $slug ||
    ($slug in ["data-fetching-and-caching", "data-fetching-caching"] && slug.current == "nextjs-app-router-in-depth-fetching-in-server-components")
  )][0] {
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    thumbnail,
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    resources[]{
      _key,
      type,
      title,
      url,
      description
    },
    "course": *[_type == "course" && references(^._id)][0] {
      _id,
      title,
      "slug": slug.current,
      level,
      coverImage,
      instructor->{
        _id,
        name,
        "slug": slug.current,
        photo,
        expertise
      },
      modules[]{
        _key,
        title,
        summary,
        "duration": math::sum(lessons[]->duration),
        lessons[]->{
          _id,
          title,
          "slug": slug.current,
          duration,
          freePreview,
          studentCount
        }
      }
    }
  }
`)

/**
 * Query to fetch all lesson slugs for static parameter generation.
 */
export const allLessonsSlugsQuery = defineQuery(`
  *[_type == "lesson"]{
    "slug": slug.current
  }
`)

/**
 * Query to fetch all instructors.
 */
export const allInstructorsQuery = defineQuery(`
  *[_type == "instructor"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "coursesCount": count(*[_type == "course" && references(^._id)])
  }
`)

/**
 * Query to fetch a single instructor by slug with authored courses.
 */
export const instructorBySlugQuery = defineQuery(`
  *[_type == "instructor" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photo,
    expertise,
    bio,
    "courses": *[_type == "course" && references(^._id)] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      summary,
      coverImage,
      level,
      price,
      popular,
      studentCount,
      category->{
        _id,
        title,
        "slug": slug.current
      },
      "modulesCount": count(modules),
      "lessonsCount": count(modules[].lessons[])
    }
  }
`)

/**
 * Query to fetch all categories.
 */
export const allCategoriesQuery = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "coursesCount": count(*[_type == "course" && references(^._id)])
  }
`)

/**
 * Query to fetch all courses with modules and lessons for grounded search matching.
 */
export const searchCoursesAndLessonsQuery = defineQuery(`
  *[_type == "course"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    _createdAt,
    coverImage,
    modules[]{
      _key,
      title,
      summary,
      duration,
      lessons[]->{
        _id,
        title,
        "slug": slug.current,
        duration,
        keyPoints,
        thumbnail,
        videoUrl,
        notes,
        studentCount,
        _createdAt
      }
    }
  }
`)

