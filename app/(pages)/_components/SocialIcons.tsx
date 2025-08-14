import { cn, createIconKey, kebabCaseToCompCase } from "@/app/lib";
import { IconPicker } from "@/sanity.types";
import { ComponentPropsWithRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

type SocialLink = {
  title?: string;
  url?: string;
  icon?: IconPicker;
  _type: "link";
  _key: string;
};
const Icons = {
  ...FaIcons,
  ...SiIcons,
};

const SocialIcons = ({
  color = "text-black",
  socialIcons,
  className,
  withoutTitles = false,
  ...rest
}: ComponentPropsWithRef<"ul"> & {
  color?: string;
  socialIcons: SocialLink[];
  className?: string;
  withoutTitles?: boolean;
}) => {
  if (!socialIcons) return;

  return (
    <ul
      className={cn(
        `flex justify-between gap-4 mx-auto my-4 w-fit ${color}`,
        className
      )}
      {...rest}
    >
      {socialIcons.map((link) => {
        if (!link.icon || !link.icon.name || !link.icon.provider) return;
        const iconKey = createIconKey(link.icon.name, link.icon.provider);
        const Icon = Icons[kebabCaseToCompCase(iconKey) as keyof typeof Icons];

        return (
          <li key={link.icon.name} className="text-3xl">
            <a
              href={link.url}
              target="_blank"
              className="flex items-center gap-2 capitalize"
            >
              {!Icon ? <>{link.icon.name}</> : <Icon />}
              {!withoutTitles && (
                <span className="md:block hidden">{link.title}</span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialIcons;
