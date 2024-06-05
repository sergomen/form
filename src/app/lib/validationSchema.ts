import { z } from 'zod';

export const userValidationSchema = z.object({
    name: z.string().min(2, 'Name is required').max(255),
    // phone: z.string().phone('Phone is required').max(255),
    // email: z.string().string('Invalid email').max(15),
    // skill: z.string().skill('Invalid skill').max(255)
});