import { pgTable, serial,text, varchar } from "drizzle-orm/pg-core";
export const MockInterview = pgTable('MockInterview',{  //this are the columuns of the database
    id:serial('id').primaryKey(),
    jsonMockresponse :text('jsonMockresponse').notNull(),
    jobPosition : varchar('jobPosition').notNull(),
    jobDesc : varchar('jobDesc').notNull(),
    jobExp : varchar('jobExp').notNull(),
    Resume : varchar('Resume').notNull(),
    createdby : varchar('createdby').notNull(),
    createdat : varchar('createdat').notNull(),
    mockId:varchar('mockID').notNull()
    
})

export const UserAnswer=pgTable('UserAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockID').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt') 
})