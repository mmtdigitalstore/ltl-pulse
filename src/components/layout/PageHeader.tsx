import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "relative mx-auto max-w-7xl text-center md:text-left ltl-page-header-glow",
        className,
      )}
    >
      <h1 className="relative font-heading text-4xl font-semibold text-ltl-text-primary md:text-5xl">
        {title}
      </h1>
      <p className="relative mt-4 max-w-2xl text-lg text-ltl-text-secondary md:text-xl">
        {subtitle}
      </p>
    </header>
  );
}
