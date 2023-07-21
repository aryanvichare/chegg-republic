import BlurImage from "@/components/BlurImage";

const logos = [
  {
    slug: "openai",
  },
  {
    slug: "langchain",
  },
  {
    slug: "pinecone",
  },
  {
    slug: "supabase",
  },
  {
    slug: "redis",
  },
  {
    slug: "vercel",
  },
];

export default function Logos({
  copy = "Built with the leading technologies in the industry",
}: {
  copy?: string;
}) {
  return (
    <div className='mx-auto mb-32 mt-36 max-w-6xl md:mb-12 lg:mt-44'>
      <p className='mx-auto max-w-sm text-center font-display text-base opacity-70 sm:max-w-xl'>
        {copy}
      </p>
      <div className='mx-auto mt-8 grid h-[45px] w-full grid-cols-2 place-items-center items-start gap-5 px-5 sm:grid-cols-3 sm:px-0 md:grid-cols-3 lg:grid-cols-6'>
        {logos.map(({ slug }) => (
          <div
            key={slug}
            className='relative flex h-[44px] items-center justify-center'>
            <BlurImage
              src={`/images/logos/${slug}.svg`}
              alt={slug.toUpperCase()}
              width={200}
              height={150}
              className={`col-span-1`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
