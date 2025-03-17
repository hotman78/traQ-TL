import markdownToHtml from "@/lib/markdownToHtml";

export default async function Article({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: String(await markdownToHtml(content || ""))
      }}
    />
  );
}
