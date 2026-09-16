export default function SuccessMessage({
  heading,
  message,
}: {
  heading: string;
  message: string;
}) {
  return (
    <div
      role="status"
      className="rounded-xl2 border border-sage-100 bg-sage-50 p-8 text-center"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="mx-auto mb-4 text-sage-600"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12.5l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3 className="text-xl font-semibold text-sage-700">{heading}</h3>
      <p className="mx-auto mt-2 max-w-md text-base text-ink-700">{message}</p>
    </div>
  );
}
