import rehypeKatex from "rehype-katex"; // Render math with KaTeX.
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm"; // Support GitHub Flavored Markdown.
import remarkMath from "remark-math"; // Support math like `$so$`.\

import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

export default function markdownToHtml(markdown: string) {
  return unified()
    .use(remarkParse) // markdown → mdast
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true }) // mdast → hast
    .use(rehypeKatex, { throwOnError: true, strict: true })
    .use(rehypeStringify, { allowDangerousHtml: true }) // hast → html
    .process(markdown);
}
