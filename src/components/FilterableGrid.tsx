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
  book: "bg-coral-100 text-coral-600 border-coral-200",
  article: "bg-ocean-100 text-ocean-600 border-ocean-200",
  blog: "bg-seafoam-100 text-seafoam-500 border-seafoam-200",
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
        <span className="text-ocean-500 text-sm font-medium mr-1">Type:</span>
        {(["all", "book", "article", "blog"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeType === type
                ? "bg-coral-400 text-white border-coral-400"
                : "bg-white text-ocean-600 border-sand-300 hover:border-ocean-300"
            }`}
          >
            {type === "all" ? "All" : TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-ocean-500 text-sm font-medium mr-1">Tags:</span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              activeTags.has(tag)
                ? "bg-coral-400 text-white border-coral-400"
                : "bg-white text-ocean-600 border-sand-300 hover:border-ocean-300"
            }`}
          >
            {tag}
          </button>
        ))}
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-xs text-ocean-400 hover:text-coral-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sand-500 text-sm mb-6">
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
            className="group block bg-white border border-sand-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-coral-300 transition-all duration-200"
          >
            {/* Type badge */}
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 ${TYPE_COLORS[read.type]}`}>
              {TYPE_LABELS[read.type]}
            </span>

            {/* Title */}
            <h3 className="font-display text-lg font-bold text-ocean-900 group-hover:text-coral-500 transition-colors leading-snug">
              {read.title}
            </h3>

            {/* Author */}
            <p className="text-ocean-400 text-sm mt-1">{read.author}</p>

            {/* Blurb */}
            <p className="text-ocean-600 text-sm mt-3 leading-relaxed">{read.blurb}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {read.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-sand-100 text-ocean-500 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Date */}
            <p className="text-sand-400 text-xs mt-4">{read.dateAdded}</p>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-ocean-400">
          <p className="text-lg">No entries match your filters.</p>
          <button
            onClick={clearFilters}
            className="mt-2 text-coral-500 hover:text-coral-400 text-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
