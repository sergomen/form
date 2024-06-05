import { z } from 'zod';
import validator from 'validator';

const selectOptionSchema = z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
});

export const formDataSchema = z.object({
    name: z.string().min(2, {message: "Must be 5 or more characters long"}),
    phone: z.string().refine(validator.isMobilePhone, {message: "Must be like 2124567890 or +1-212-456-7890"}),
    email: z.string().email(),
    skills: z.array(selectOptionSchema).nonempty('You must select at least one skill'),
    file: z.instanceof(File).refine(file => ['application/pdf', 'application/msword', 'image/png'].includes(file.type), {
        message: 'Unsupported file format. Only PDF, DOCX, PNG are accepted.',
      }).refine(file => file.size < 5000000, { // 5 Mb
        message: 'The file is too large. The maximum file size is 5 MB.',
    }),
    consent: z.boolean().refine(value => value === true, {
        message: "Consent must be granted",
    }),
});