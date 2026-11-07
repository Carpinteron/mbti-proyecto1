import { LinkButton } from '../ui/Button';

/** Friendly empty state shown when nothing has been saved yet. */
function EmptyCollection() {
  return (
    <div className="mx-auto grid max-w-5xl items-center gap-8 py-8 md:grid-cols-2 md:gap-12" role="status">
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-light leading-tight sm:text-5xl">Your collection is empty</h2>
        <p className="mx-auto mt-4 max-w-sm text-muted md:mx-0">
          Save the personalities you want to revisit and they will show up here.
        </p>
        <LinkButton to="/types" className="mt-8">Explore the types →</LinkButton>
      </div>
      <img
        src="/9ef6e14bf142170fd519bfdaef8249ee.png"
        alt="Illustration of diverse personalities gathered around a campfire"
        width={1400}
        height={1200}
        className="mx-auto w-full max-w-md select-none md:max-w-none"
      />
    </div>
  );
}

export default EmptyCollection;
