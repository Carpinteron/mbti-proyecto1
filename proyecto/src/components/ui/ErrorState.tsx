import type { ReactNode } from 'react';

interface Props {
  title: string;
  message: string;
  /** Action buttons or links shown under the message. */
  children?: ReactNode;
}

/** Full-section error state: friendly text on the left and an illustration on the right. */
function ErrorState({ title, message, children }: Props) {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-8 py-8 md:grid-cols-2 md:gap-12" role="alert">
      <div className="text-center md:text-left">
        <span className="inline-block -rotate-1 bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-on-accent">
          Something went wrong
        </span>
        <h1 className="mt-5 text-4xl font-light leading-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-sm text-muted md:mx-0">{message}</p>
        {children && <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:justify-start sm:justify-center">{children}</div>}
      </div>
      <img
        src="/9ef6e14bf142170fd519bfdaef8249ee.png"
        alt=""
        width={1400}
        height={1200}
        className="mx-auto w-full max-w-md select-none md:max-w-none"
      />
    </div>
  );
}

export default ErrorState;
