import { PortableTextComponents } from "@portabletext/react";
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "sanity";

export const textBlockComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>,
    h4: ({ children }) => (
      <h2 className="text-base font-semibold">{children}</h2>
    ),
    h5: ({ children }) => (
      <h2 className="text-base font-semibold">{children}</h2>
    ),
    h6: ({ children }) => (
      <h2 className="text-base font-semibold">{children}</h2>
    ),
    normal: ({ children }) => (
      <p className="text-base lg:text-lg text-band-muted mb-6 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 pl-4 italic">{children}</blockquote>
    ),
  },
  marks: {
    em: ({ children }) => {
      return <em className="italic">{children}</em>;
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    highlight: ({ children }) => (
      <span className="bg-yellow-200">{children}</span>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 my-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 my-4">{children}</ol>
    ),
  },
};

type TSanityTextBlockProps = {
  value: PortableTextBlock[];
};
const SanityTextBlock = ({ value }: TSanityTextBlockProps) => {
  return <PortableText value={value} components={textBlockComponents} />;
};

export default SanityTextBlock;
