"use client";
import { Button } from "@/app/components/Button";
import { Input } from "./Input";
import { useActionState, useEffect, useState } from "react";
import { subscribeAction } from "./subscribeAction";

const SubscribeForm = ({ successMessage }: { successMessage: string }) => {
  const [errorMessage, setErrorMessage] = useState<undefined | string>(
    undefined
  );

  const [formSuccess, setFormSuccess] = useState(false);

  const [formState, formAction, isPending] = useActionState(subscribeAction, {
    success: false,
    errors: undefined,
  });

  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    if (formState.errors) {
      if (formState.errors && "message" in formState.errors) {
        setErrorMessage(formState.errors.message);
        const timeout = setTimeout(() => {
          setErrorMessage(undefined);
        }, 7000);

        return () => clearTimeout(timeout);
      }
    } else {
      setErrorMessage(undefined);
    }
  }, [formState.errors]);

  return (
    <form
      // onSubmit={handleSubmit}
      className="space-y-4"
      action={formAction}
    >
      {formState.success ? (
        <Button
          disabled
          variant={"outline"}
          className=" bg-black/10 text-white cursor-pointer"
        >
          ✔️ {successMessage}
        </Button>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Tu nombre"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="bg-band-dark/50 border-band-primary/30 text-band-light placeholder:text-band-muted focus:border-band-primary focus:ring-band-primary h-12"
            />
            <Input
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="bg-band-dark/50 border-band-primary/30 text-band-light placeholder:text-band-muted focus:border-band-primary focus:ring-band-primary h-12"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isPending}
            className="w-full md:w-auto bg-gradient-accent hover:shadow-glow transition-smooth px-12 py-6 text-lg"
          >
            {isPending ? "Suscribiendo..." : "Suscríbete"}
          </Button>
        </>
      )}
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
    </form>
  );
};

export default SubscribeForm;
