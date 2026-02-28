CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"provider" text,
	"provider_id" text,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text,
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "breeds" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"blood_type" text NOT NULL,
	"temperament" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"is_spanish" boolean DEFAULT false NOT NULL,
	"height" text,
	"uses" text,
	"history" text
);
--> statement-breakpoint
CREATE TABLE "coat_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "coats" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"english_name" text,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"phenotype_image_url" text,
	"genetic_base" text,
	"genotype" text,
	"gene_dominance" text,
	"extension_gene" text,
	"agouti_gene" text,
	"cream_gene" text,
	"pearl_gene" text,
	"dun_gene" text,
	"silver_gene" text,
	"champagne_gene" text,
	"gray_gene" text,
	"roan_gene" text,
	"tobiano_gene" text,
	"frame_gene" text,
	"sabino_gene" text,
	"splashed_white_gene" text,
	"leopard_complex_gene" text,
	"pangare_modifier" boolean DEFAULT false,
	"rabicano_modifier" boolean DEFAULT false,
	"flaxen_modifier" boolean DEFAULT false,
	"sooty_modifier" boolean DEFAULT false,
	"base_coat" text,
	"is_dilution" boolean DEFAULT false,
	"is_pattern" boolean DEFAULT false,
	"is_lethal" boolean DEFAULT false,
	"body_color" text,
	"mane_color" text,
	"eye_color" text,
	"skin_color" text,
	"primitive_markings" boolean DEFAULT false,
	"variants" text,
	"category_id" integer,
	"display_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "culture_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"content" text NOT NULL,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "media_entries" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"link_url" text,
	"image_url" text
);
--> statement-breakpoint
ALTER TABLE "coats" ADD CONSTRAINT "coats_category_id_coat_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."coat_categories"("id") ON DELETE no action ON UPDATE no action;