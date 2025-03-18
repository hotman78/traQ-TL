import markdownToHtml from "@/lib/markdownToHtml";

export default async function Article({ content }: { content: string }) {
  return (
    <div
      className="text-wrap"
      dangerouslySetInnerHTML={{
        __html: String(await markdownToHtml(content || ""))
      }}
    />
  );
}
