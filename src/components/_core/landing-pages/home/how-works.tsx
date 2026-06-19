import Image from "next/image";

type Step = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const STEPS: Step[] = [
  {
    id: "discover",
    title: "Discover",
    description:
      "Engage with restaurants, hotels and supermarkets near you.",
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Person browsing on a smartphone",
  },
  {
    id: "review",
    title: "Review",
    description:
      "Share your experience and help others make better choices.",
    imageSrc:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Friends taking a photo together",
  },
  {
    id: "earn",
    title: "Earn KPS",
    description: "Earn points for reviews and purchases",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Professional using a smartphone at work",
  },
  {
    id: "redeem",
    title: "Redeem",
    description:
      "Use your points to get discounts & exclusive rewards.",
    imageSrc:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Shopping basket with discount symbols",
  },
];

function StepCard({ title, description, imageSrc, imageAlt }: Step) {
  return (
    <article className="flex flex-col items-center rounded-2xl border border-neutral-200/90 bg-white px-5 py-5 text-center sm:px-6">
      <h3 className="text-lg font-bold text-neutral-900 sm:text-xl">{title}</h3>
      <div className="relative mt-6 h-16 w-full max-w-55 overflow-hidden rounded-full sm:mt-8  sm:max-w-60">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="240px"
          className="object-cover"
        />
      </div>
      <p className="mt-6 max-w-[16rem] text-sm leading-relaxed text-neutral-600 sm:mt-8">
        {description}
      </p>
    </article>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl mt-190 md:mt-110 lg:mt-30">
        <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          How It Works
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:mt-12 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StepCard key={step.id} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
