interface TwoColumnGridProps {
  title: string;
  description: string;
}

export function TwoColumnGrid({ title, description }: TwoColumnGridProps) {
  return (
    <div className="w-full py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
        <div className="w-full h-[300px] bg-slate-200 rounded-lg flex items-center justify-center">
          <span className="text-slate-400 text-sm">Image placeholder</span>
        </div>
      </div>
    </div>
  );
}
