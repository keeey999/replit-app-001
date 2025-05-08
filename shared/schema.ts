import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Employee Profile Schema
export const employeeProfiles = pgTable("employee_profiles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birthdate: text("birthdate"),
  previousJob: text("previous_job"),
  hobby: text("hobby"),
  skill: text("skill"),
  personality: text("personality"),
  motto: text("motto"),
  comment: text("comment"),
  photoUrl: text("photo_url"),
  cardStyle: text("card_style").default("blue"),
  createdAt: text("created_at"),
});

export const insertEmployeeProfileSchema = createInsertSchema(employeeProfiles).pick({
  name: true,
  birthdate: true,
  previousJob: true,
  hobby: true,
  skill: true,
  personality: true,
  motto: true,
  comment: true,
  photoUrl: true,
  cardStyle: true,
});

export const employeeProfileFormSchema = z.object({
  name: z.string().optional(),
  birthdate: z.string().optional(),
  previousJob: z.string().optional(),
  hobby: z.string().optional(),
  skill: z.string().optional(),
  personality: z.string().optional(),
  motto: z.string().optional(),
  comment: z.string().optional(),
  photoUrl: z.string().optional(),
  cardStyle: z.enum(["blue", "green", "amber"]).default("blue"),
  layoutStyle: z.enum(["standard", "modern", "compact"]).default("standard"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertEmployeeProfile = z.infer<typeof insertEmployeeProfileSchema>;
export type EmployeeProfile = typeof employeeProfiles.$inferSelect;
export type EmployeeProfileForm = z.infer<typeof employeeProfileFormSchema>;
