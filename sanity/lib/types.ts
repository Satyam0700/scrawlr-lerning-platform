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
  duration?: number
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
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | string
    coverImage?: SanityImage
    instructor?: Instructor
    modules: ModuleData[]
  }
}

export type SearchResultType = 'video' | 'lesson';

export interface SearchResultItem {
  id: string;
  type: SearchResultType;
  title: string;
  description: string;
  slug: string;
  courseTitle: string;
  courseSlug: string;
  moduleTitle: string;
  moduleNumber: number;
  lessonNumber?: number;
  duration?: number;
  durationFormatted?: string;
  startSeconds?: number;
  startFormatted?: string;
  thumbnailUrl?: string;
  keyPoints?: string[];
  relevanceScore?: number;
  createdAt?: string;
}

export interface SearchResponseData {
  query: string;
  results: SearchResultItem[];
  totalCount: number;
  coursesCount: number;
}

