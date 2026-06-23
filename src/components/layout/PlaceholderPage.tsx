interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ltl-bg px-4">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-semibold text-ltl-accent md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-sans text-lg text-ltl-text-secondary">
          Coming soon
        </p>
      </div>
    </div>
  );
}
