import { LinkButton } from '../components/ui/Button';

/** Editorial-style 404: oversized headline, accent tag and thin rules. */
function NotFound() {
  return (
    <section
      className="mx-auto flex min-h-[calc(100vh-280px)] max-w-5xl flex-col items-center justify-center px-4 py-12 text-center"
      aria-labelledby="not-found-title"
    >
      <div className="relative w-full">
        {/* Thin rules framing the headline */}
        <span className="absolute -top-4 left-0 h-px w-20 bg-fg sm:w-28" aria-hidden="true" />
        <span className="absolute -bottom-4 right-0 h-px w-20 bg-fg sm:w-28" aria-hidden="true" />

        <h1
          id="not-found-title"
          className="relative text-5xl font-light uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl"
        >
          {/* The tag overlaps the start of the headline, like in the reference */}
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-1 bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-on-accent sm:left-2 sm:text-xs">
            Error 404
          </span>
          Page not found
        </h1>
      </div>

      <p className="mt-14 max-w-sm text-sm leading-6 text-muted">
        The page you were looking for could not be found. It might have been removed, renamed, or did not exist in the first place.
      </p>

      <LinkButton to="/" className="mt-10">Go to home page →</LinkButton>
    </section>
  );
}

export default NotFound;
