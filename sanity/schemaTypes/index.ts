import { type SchemaTypeDefinition } from 'sanity'

import { categoryType } from './categoryType'
import { instructorType } from './instructorType'
import { resourceType } from './resourceType'
import { blockContentType } from './blockContentType'
import { lessonType } from './lessonType'
import { learningOutcomeType } from './learningOutcomeType'
import { moduleType } from './moduleType'
import { courseType } from './courseType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Top-level Documents
    courseType,
    lessonType,
    instructorType,
    categoryType,

    // Embedded Objects & Helper Types
    moduleType,
    learningOutcomeType,
    resourceType,
    blockContentType,
  ],
}
