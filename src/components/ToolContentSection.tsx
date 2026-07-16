import Link from "next/link";
import { CheckCircle2, Lightbulb, ArrowRight } from "lucide-react";

export interface ToolContentData {
  /** 2-3 paragraphs introducing the tool and the problem it solves. */
  overview: string[];
  /** Step-by-step "how to use" instructions. */
  steps: { title: string; description: string }[];
  /** Real-world scenarios where this tool is useful. */
  useCases: { title: string; description: string }[];
  /** Practical tips for getting better results. */
  tips: string[];
  /** Frequently asked questions unique to this tool. */
  faqs: { q: string; a: string }[];
  /** Related tools to cross-link (slug must match /tools/[slug]). */
  relatedTools: { name: string; slug: string }[];
}

export function ToolContentSection({ data }: { data: ToolContentData }) {
  return (
    <div className="space-y-8">
      <div className="glass rounded-xl p-8 space-y-4">
        {data.overview.map((para, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="glass rounded-xl p-8 space-y-5">
        <h2 className="text-xl font-semibold">Step-by-step instructions</h2>
        <ol className="space-y-4">
          {data.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="glass rounded-xl p-8 space-y-5">
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.useCases.map((uc, i) => (
            <div key={i} className="bg-muted/40 rounded-lg p-4">
              <p className="font-medium text-sm mb-1">{uc.title}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-xl p-8 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Lightbulb size={20} className="text-primary" />
          Tips for best results
        </h2>
        <ul className="space-y-2">
          {data.tips.map((tip, i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
              <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-xl p-8 space-y-4">
        <h2 className="text-xl font-semibold">Frequently asked questions</h2>
        <div className="space-y-4">
          {data.faqs.map((f, i) => (
            <div key={i}>
              <p className="font-medium">{f.q}</p>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {data.relatedTools.length > 0 && (
        <div className="glass rounded-xl p-8 space-y-4">
          <h2 className="text-xl font-semibold">Related tools</h2>
          <div className="flex flex-wrap gap-3">
            {data.relatedTools.map((rt) => (
              <Link
                key={rt.slug}
                href={`/tools/${rt.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium bg-muted/50 hover:bg-muted px-4 py-2 rounded-full transition-colors"
              >
                {rt.name} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
