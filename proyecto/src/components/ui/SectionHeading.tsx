interface Props {
  eyebrow: string;
  title: string;
  description: string;
}

function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-8">
      <div>
        <span className="text-xs font-bold tracking-[.2em] text-muted">{eyebrow}</span>
        <h1 className="mt-3 text-5xl font-bold tracking-tight text-fg">{title}</h1>
      </div>
      <p className="text-muted">{description}</p>
    </header>
  );
}

export default SectionHeading;
