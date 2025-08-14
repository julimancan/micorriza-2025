import { AiFillMail } from "react-icons/ai";
import { SITE_SETTINGS_QUERYResult } from "@/sanity.types";
import SubscribeForm from "./SubscribeForm";

const Subscribe = ({
  subscribe,
}: {
  subscribe: NonNullable<SITE_SETTINGS_QUERYResult>["subscribe"];
}) => {
  return (
    <section className="py-24 px-6 bg-gradient-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute bg-primary inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-band-primary rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-band-secondary rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-band-primary rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center shadow-glow">
            <AiFillMail className="w-8 h-8 text-band-light" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-band-light">
          <span className="bg-gradient-accent bg-clip-text text-transparent ml-4">
            {subscribe?.title}
          </span>
        </h2>

        <p className="text-lg text-band-muted mb-12 leading-relaxed">
          {subscribe?.subtitle}{" "}
        </p>

        <SubscribeForm
          successMessage={
            subscribe?.subscribedMessage ?? "suscrito exitosamente"
          }
        />

        <p className="text-sm text-band-muted mt-6">{subscribe?.bottomMsg} </p>
      </div>
    </section>
  );
};

export default Subscribe;
