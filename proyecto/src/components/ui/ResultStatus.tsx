interface Props {
  kind: 'loading' | 'error' | 'empty';
  children: string;
}

function ResultStatus({ kind, children }: Props) {
  const role = kind === 'error' ? 'alert' : 'status';
  return <p role={role} className={`py-12 text-center ${kind === 'error' ? 'text-[var(--danger)]' : 'text-[var(--muted)]'}`}>{children}</p>;
}

export default ResultStatus;
