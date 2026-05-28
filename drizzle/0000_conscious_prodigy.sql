CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"fname" varchar(100) NOT NULL,
	"lName" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"provider" varchar(20),
	"external_id" varchar(100) NOT NULL,
	"image" text,
	"role" varchar(12) DEFAULT 'customer' NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
