export function EventBanner({ blok }: { blok: any }) {
  return (
    <>
      <div
        className="w-full py-4 text-center overflow-hidden text-white"
      >
        <span className="text-lg">
          {blok.location} | {blok.date}
        </span>
      </div>
    </>
  );
}
