import { useState, useMemo } from "react";

interface ReadEntry {
  title: string;
  author: string;
  type: "book" | "article" | "blog";
  link: string;
  tags: string[];
  blurb: string;
  dateAdded: string;
}

interface Props {
  reads: ReadEntry[];
}

const TYPE_LABELS: Record<ReadEntry["type"], string> = {
  book: "Book",
  article: "Article",
  blog: "Blog",
};

const TYPE_COLORS: Record<ReadEntry["type"], string> = {
  book: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  article: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  blog: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export default function FilterableGrid({ reads }: Props) {
  const [activeType, setActiveType] = useState<ReadEntry["type"] | "all">("all");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    reads.forEach((r) => r.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [reads]);

  const filtered = useMemo(() => {
    return reads.filter((r) => {
      if (activeType !== "all" && r.type !== activeType) return false;
      if (activeTags.size > 0 && !r.tags.some((t) => activeTags.has(t))) return false;
      return true;
    });
  }, [reads, activeType, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  function clearFilters() {
    setActiveType("all");
    setActiveTags(new Set());
  }

  const hasFilters = activeType !== "all" || activeTags.size > 0;

  return (
    <section className="pb-16">
      {/* Type filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-navy-400 text-sm font-medium mr-1">Type:</span>
        {(["all", "book", "article", "blog"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeType === type
                ? "bg-amber-400 text-navy-950 border-amber-400"
                : "bg-navy-900 text-navy-300 border-navy-700 hover:border-navy-500"
            }`}
          >
            {type === "all" ? "All" : TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-navy-400 text-sm font-medium mr-1">Tags:</span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              activeTags.has(tag)
                ? "bg-amber-400 text-navy-950 border-amber-400"
                : "bg-navy-900 text-navy-300 border-navy-700 hover:border-navy-500"
            }`}
          >
            {tag}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-xs text-navy-400 hover:text-navy-200 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-navy-500 text-sm mb-6">
        {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
      </p>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((read) => (
          <a
            key={read.title}
            href={read.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-navy-900 border border-navy-800 rounded-lg p-6 hover:border-amber-500/50 hover:bg-navy-800/80 transition-all duration-200"
          >
            {/* Type badge */}
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 ${TYPE_COLORS[read.type]}`}>
              {TYPE_LABELS[read.type]}
            </span>

            {/* Title */}
            <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
              {read.title}
            </h3>

            {/* Author */}
            <p className="text-navy-400 text-sm mt-1">{read.author}</p>

            {/* Blurb */}
            <p className="text-navy-300 text-sm mt-3 leading-relaxed">{read.blurb}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {read.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-navy-800 text-navy-400 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Date */}
            <p className="text-navy-600 text-xs mt-4">{read.dateAdded}</p>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-navy-500">
          <p className="text-lg">No entries match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-2 text-amber-400 hover:text-amber-300 text-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
