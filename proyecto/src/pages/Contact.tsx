import ContactForm from '../components/contact/ContactForm';

function Contact() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-10 py-4 md:grid-cols-2">
      <div className="flex flex-col md:sticky md:top-8">
        <span className="text-xs font-bold tracking-[.2em] text-[var(--muted)]">LET&apos;S CONNECT</span>
        <h1 className="mt-5 max-w-sm text-4xl font-light leading-[.97] sm:text-5xl lg:text-6xl">
          Have something <span className="text-[var(--accent)]">on your mind?</span>
        </h1>
      </div>
      <ContactForm />
    </section>
  );
}

export default Contact;
