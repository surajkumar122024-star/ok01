import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedTool {
  name: string;
  href: string;
  description: string;
}

export function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <div className="glass rounded-xl p-8 space-y-4">
      <h2 className="text-xl font-semibold">Related tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center justify-between gap-3 rounded-lg border bg-muted/30 px-4 py-3 text-sm hover:bg-muted/60 transition-colors"
          >
            <div>
              <p className="font-medium">{tool.name}</p>
              <p className="text-muted-foreground text-xs mt-0.5">{tool.description}</p>
            </div>
            <ArrowRight size={16} className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}
