import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'square';
}

export const AdPlaceholder = ({ className, variant = 'horizontal' }: AdPlaceholderProps) => {
  return (
    <div className={cn(
      "bg-muted/30 border border-dashed rounded-lg flex flex-col items-center justify-center overflow-hidden",
      variant === 'horizontal' && "w-full min-h-[90px]",
      variant === 'vertical' && "w-[160px] min-h-[600px]",
      variant === 'square' && "w-[300px] min-h-[250px]",
      className
    )}>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Advertisement</span>
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-xs text-muted-foreground/50">Google AdSense Placeholder</span>
      </div>
    </div>
  );
};