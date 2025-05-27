import { z } from "zod";

export const loginSchema = z.object({

    email: z.string().email("Invalid email address."),
    password: z.string(),

});

export const registerSchema = z.object({

    email: z.string().email("Invalid email address."),
    password: z.string().min(4, "Password must be at least 4 characters."),

    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(
            /^(?!-)(?!.*--)[a-z0-9-]+(?<!-)$/,
            "Username can only contain lowercase letters, numbers, and hyphens. It cannot start or end with a hyphen. Username cannot contain consecutive hyphens."
        )
        .transform((val) => val.toLowerCase()),
});
