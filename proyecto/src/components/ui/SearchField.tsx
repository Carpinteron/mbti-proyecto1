interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchField({ value, onChange }: Props) {
  return (
    <label className="relative block w-full sm:w-52">
      <span className="sr-only">Search personalities</span>
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]">⌕</span>
      <input
        className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] py-2 pl-8 pr-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        aria-label="Search personalities"
        placeholder="Search type..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default SearchField;
