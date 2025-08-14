"use client";
import { HOMEPAGE_CONTENT_QUERYResult } from "@/sanity.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./Carousel";
import SanityTextBlock from "./SanityTextBlock";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const Bio = ({
  bio,
  fotos,
}: {
  bio: NonNullable<HOMEPAGE_CONTENT_QUERYResult>["bio"];
  fotos: NonNullable<HOMEPAGE_CONTENT_QUERYResult>["photos"];
}) => {
  return (
    <section className="py-24 px-6 bg-band-darker">
      <div className="max-w-full lg:max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 text-band-light">
              {bio?.title}
            </h2>
            {bio?.text && <SanityTextBlock value={bio?.text} />}
          </div>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {fotos
                  ?.filter((foto) => foto.alt.trim() !== "Cuadro blanco")
                  .map((foto, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square bg-gradient-card rounded-2xl shadow-intense relative overflow-hidden">
                        {foto ? (
                          <Image
                            width={200}
                            height={200}
                            alt={foto.alt}
                            src={urlFor(foto.photo)
                              .width(200)
                              .height(200)
                              .format("webp")
                              .url()}
                            className="w-full h-full aspect-square object-cover"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-4 border border-band-primary/30 rounded-xl">
                              <div className="w-full h-full bg-gradient-accent opacity-20 rounded-lg" />
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 bg-band-primary rounded-full mb-4 mx-auto shadow-glow" />
                                <p className="text-band-muted text-sm">
                                  Photo {index + 1}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 bg-band-dark/80 border-band-primary/30 text-band-light hover:bg-band-dark" />
              <CarouselNext className="right-4 bg-band-dark/80 border-band-primary/30 text-band-light hover:bg-band-dark" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bio;
