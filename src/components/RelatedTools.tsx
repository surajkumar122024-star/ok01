interface RelatedTool {
  name: string;
  href: string;
  description: string;
}

/**
 * Related tools are now rendered by ToolContentSection.
 * Keep this compatibility component so existing tool pages do not need
 * to be edited individually.
 */
export function RelatedTools({ tools: _tools }: { tools: RelatedTool[] }) {
  return null;
}
