/**
 * Get plain text from Sanity portable text blocks (for length checks, etc.)
 */
export function getBlockContentPlainText(blocks: unknown): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return (blocks as { children?: { text?: string }[] }[])
    .map((b) => {
      if (b.children && Array.isArray(b.children)) {
        return b.children.map((c) => c.text ?? '').join('');
      }
      return '';
    })
    // Keep paragraph breaks so card snippets can render line breaks.
    .join('\n')
    .trim();
}

type PortableTextSpan = {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
};

type PortableTextMarkDef = {
  _key?: string;
  [key: string]: unknown;
};

type PortableTextBlock = {
  _key?: string;
  _type?: string;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  [key: string]: unknown;
};

/**
 * Truncate portable text blocks while preserving inline marks (bold, links, etc.).
 */
export function getTruncatedBlockContent(blocks: unknown, maxChars: number): PortableTextBlock[] {
  if (!blocks || !Array.isArray(blocks) || maxChars <= 0) return [];

  let remainingChars = maxChars;
  let wasTruncated = false;
  const truncatedBlocks: PortableTextBlock[] = [];

  for (const block of blocks as PortableTextBlock[]) {
    if (remainingChars <= 0) {
      wasTruncated = true;
      break;
    }

    if (!block || block._type !== 'block' || !Array.isArray(block.children)) {
      continue;
    }

    const keptChildren: PortableTextSpan[] = [];
    const referencedMarks = new Set<string>();

    for (const child of block.children) {
      if (remainingChars <= 0) {
        wasTruncated = true;
        break;
      }

      const text = child?.text ?? '';
      if (!text) continue;

      const keptText = text.slice(0, remainingChars);
      if (!keptText) continue;

      remainingChars -= keptText.length;

      if (keptText.length < text.length) {
        wasTruncated = true;
      }

      const marks = Array.isArray(child.marks)
        ? child.marks.filter((mark): mark is string => typeof mark === 'string')
        : undefined;

      marks?.forEach((mark) => referencedMarks.add(mark));
      keptChildren.push({
        ...child,
        text: keptText,
        ...(marks ? { marks } : {}),
      });
    }

    if (!keptChildren.length) continue;

    const keptMarkDefs = Array.isArray(block.markDefs)
      ? block.markDefs.filter(
          (markDef) => typeof markDef?._key === 'string' && referencedMarks.has(markDef._key),
        )
      : undefined;

    truncatedBlocks.push({
      ...block,
      children: keptChildren,
      ...(keptMarkDefs ? { markDefs: keptMarkDefs } : {}),
    });
  }

  if (wasTruncated && truncatedBlocks.length > 0) {
    const lastBlock = truncatedBlocks[truncatedBlocks.length - 1];
    const lastChildren = lastBlock.children ?? [];
    if (lastChildren.length > 0) {
      const lastChild = lastChildren[lastChildren.length - 1];
      const nextText = `${(lastChild.text ?? '').trimEnd()}...`;
      lastBlock.children = [
        ...lastChildren.slice(0, -1),
        {
          ...lastChild,
          text: nextText,
        },
      ];
    }
  }

  return truncatedBlocks;
}
