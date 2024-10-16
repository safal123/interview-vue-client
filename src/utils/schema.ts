import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'

export const customerFormSchema = toTypedSchema(
    zod.object({
        name: zod.string().min(2, { message: 'Name must be at least 2 characters' }),
        reference: zod.string().min(2, 'Reference is required'),
        category: zod
            .string()
            .min(1, 'Category is required')
            .refine(
                (value) => ['Gold', 'Silver', 'Bronze'].includes(value),
                { message: 'Invalid category' }
            ),
        startDate: zod
            .string()
            .min(1, 'Start Date is required')
            .refine(
                (value) => new Date(value),
                { message: 'Invalid date' }
            ),
        description: zod
            .string()
            .min(5, 'Description must be at least 5 characters'),
    })
)