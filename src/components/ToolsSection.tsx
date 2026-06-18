"use client";

import { useState } from "react";

type Tool = {
  name: string;
  desc: string;
  icon: string;
  cat: string;
  isNew?: boolean;
};

const TOOLS: Tool[] = [
  { name: "PDF to Image",       desc: "Pages ko images mein convert karein", icon: "📄", cat: "pdf",       isNew: true  },
  { name: "Merge PDF",          desc: "Multiple PDFs ko ek mein join karein", icon: "📎", cat: "pdf"                    },
  { name: "Split PDF",          desc: "PDF ke pages alag karein",             icon: "✂️", cat: "pdf"                    },
  { name: "Compress PDF",       desc: "PDF size chhoti karein",               icon: "🗜️", cat: "pdf"                    },
  { name: "Image Resize",       desc: "Image ka size badlo ya ghataao",       icon: "🖼️", cat: "image",    isNew: true  },
  { name: "Image Compress",     desc: "Image file size kam karein",           icon: "📉", cat: "image"                  },
  { name: "Image Converter",    desc: "PNG, JPG, WebP convert karein",        icon: "🔄", cat: "image"                  },
  { name: "Background Remove",  desc: "Image ka background hatao",            icon: "🪄", cat: "image"                  },
  { name: "Word Counter",       desc: "Words aur characters count karein",    icon: "🔤", cat: "text"                   },
  { name: "Case Converter",     desc: "Text uppercase/lowercase karein",      icon: "Aa", cat: "text"                   },
  { name: "Lorem Ipsum",        desc: "Dummy text generate karein",           icon: "📝", cat: "text"                   },
  { name: "Text Diff",          desc: "Do texts ke beech difference dekho",   icon: "🔍", cat: "text"                   },
  { name: "Unit Converter",     desc: "Length, weight, temp convert karein",  icon: "⚖️", cat: "converter"             },
  { name: "Currency Converter", desc: "Live exchange rates ke saath",         icon: "💱", cat: "converter", isNew: true },
  { name: "Color Converter",    desc: "HEX, RGB, HSL convert karein",         icon: "🎨", cat: "converter"             },
  { name: "Base64 Encoder",     desc: "Text ya file encode/decode karein",    icon: "💻", cat: "converter"             },
  { name: "Keyword Density",    desc: "Page mein keyword frequency dekho",    icon: "📊", cat: "seo"                   },
  { name: "Meta Tag Generator", desc: "SEO meta tags banao",                  icon: "🏷️", cat: "seo",      isNew: true  },
  { name: "Sitemap Generator",  desc: "XML sitemap generate karein",          icon: "🗺️", cat: "seo"                   },
  { name: "Percentage Calc",    desc: "Percentage easily calculate karein",   icon: "📐", cat: "calc"                  },
  { name: "Age Calculator",     desc: "Date se exact age nikalo",             icon: "📅", cat: "calc"                  },
  { name: "EMI Calculator",     desc: "Loan EMI calculate karein",            icon: "🏦", cat: "calc",     isNew: true  },
];

const CATEGORIES = [
  { key: "all",       label: "All Tools"  },
  { key: "pdf",       label: "PDF"        },
  { key: "image",     label: "Image"      },
  { key: "text",      label: "Text"       },
  { key: "converter", label: "Converter"  },
  { key: "seo",       label: "SEO"        },
  { key: "calc",      label: "Calculator" },
];

const CAT_LABELS: Record<string, string> = {
  pdf:       "PDF Tools",
  image:     "Image Tools",
  text:      "Text Tools",
  converter: "Converters",
  seo:       "SEO Tools",
  calc:      "Calculators",
};

function ToolCard({ tool, onClick }: { tool: Tool; onClick?: (t: Tool) => void }) {
  return (
    <div
      onClick={() => onClick?.(tool)}
      onKeyDown={(e) => e.key === "Enter" && onClick?.(tool)}
      role="button"
      tabIndex={0}
      aria-label={tool.name}
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 14,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        transition: "box-shadow 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#a5b4fc";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px #ede9fe";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: "#f5f3ff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22,
      }}>
        {tool.icon}
      </div>

      <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#111827" }}>
        {tool.name}
      </p>
      <p style={{ margin: 0, fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>
        {tool.desc}
      </p>

      {tool.isNew && (
        <span style={{
          position: "absolute", top: 10, right: 10,
          fontSize: 10, fontWeight: 600,
          background: "#d1fae5", color: "#065f46",
          borderRadius: 99, padding: "2px 7px",
        }}>
          New
        </span>
      )}
    </div>
  );
}

export default function ToolsSection({ onToolClick }: { onToolClick?: (tool: Tool) => void }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = TOOLS.filter((t) => {
    const matchCat = activeCategory === "all" || t.cat === activeCategory;
    const q = query.toLowerCase();
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const grouped: Record<string, Tool[]> | null =
    activeCategory === "all" && !query
      ? filtered.reduce((acc, t) => {
          if (!acc[t.cat]) acc[t.cat] = [];
          acc[t.cat].push(t);
          return acc;
        }, {} as Record<string, Tool[]>)
      : null;

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 10,
  };

  return (
    <section style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem", fontFamily: "sans-serif" }}>

      {/* Search */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        border: "1.5px solid #e5e7eb", borderRadius: 12,
        padding: "10px 16px", marginBottom: "1.25rem", background: "#fff",
      }}>
        <span style={{ fontSize: 16 }}>🔍</span>
        <input
          type="text"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search tools"
          style={{
            flex: 1, border: "none", outline: "none",
            fontSize: 15, color: "#111827", background: "transparent",
          }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 14 }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "1.5rem" }} role="tablist">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={activeCategory === c.key}
            onClick={() => setActiveCategory(c.key)}
            style={{
              padding: "6px 16px",
              borderRadius: 99,
              border: "1.5px solid",
              borderColor: activeCategory === c.key ? "#4f46e5" : "#e5e7eb",
              background: activeCategory === c.key ? "#4f46e5" : "#fff",
              color: activeCategory === c.key ? "#fff" : "#6b7280",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      {grouped ? (
        Object.entries(grouped).map(([cat, tools]) => (
          <div key={cat}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.07em",
              textTransform: "uppercase", color: "#9ca3af",
              margin: "1.5rem 0 0.75rem",
            }}>
              {CAT_LABELS[cat]}
            </p>
            <div style={gridStyle}>
              {tools.map((t) => <ToolCard key={t.name} tool={t} onClick={onToolClick} />)}
            </div>
          </div>
        ))
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#9ca3af", fontSize: 14, padding: "3rem 0" }}>
          Koi tool nahi mila. Doosra search try karein.
        </p>
      ) : (
        <div style={gridStyle}>
          {filtered.map((t) => <ToolCard key={t.name} tool={t} onClick={onToolClick} />)}
        </div>
      )}
    </section>
  );
}
