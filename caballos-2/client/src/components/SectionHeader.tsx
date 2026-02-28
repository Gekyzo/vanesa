import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, description, className, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4 mb-12", align === "center" ? "text-center" : "text-left", className)}>
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-primary">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      <div className={cn("h-1 w-20 bg-accent rounded-full mt-4", align === "center" ? "mx-auto" : "")} />
    </div>
  );
}
