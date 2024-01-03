import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export type ISection = {
  title: string;
  items?: Array<{
    label: string;
    href?: string;
    isBlank?: boolean;
  }>;
};

export type SocialMedia = {
  image: LiveImage;
  href: string;
  description?: string;
  isBlank?: boolean;
};

export interface Props {
  section?: Array<ISection>;
  /**
   * @format color
   */
  titleColor?: string;
  social?: {
    title: string;
    items?: SocialMedia[];
  };
  payments?: {
    title: string;
    items?: Array<{ image: LiveImage; description?: string }>;
  };
  footerItens: {
    description: string;
    images: {
      image: LiveImage;
      width: number;
      height: number;
      alt: string;
    }[];
  };
}

function EmbellezeFaq(
  { section, social, payments, titleColor, footerItens }: Props,
) {
  return (
    <footer class="flex flex-col flex-wrap justify-between m-auto w-11/12 max-w-[1300px] md:flex-row py-[42px]">
      {section?.map(({ title, items }: ISection) => (
        <section class="flex flex-col my-4 mr-4">
          <h4
            class="text-primary text-xl uppercase font-bold"
            style={{ color: titleColor }}
          >
            {title}
          </h4>
          <>
            {items?.map(({ label, href, isBlank }) => (
              <a
                class="mt-2"
                href={href}
                target={isBlank ? "_blank" : "_self"}
                rel={isBlank ? "noopener noreferrer" : ""}
              >
                {label}
              </a>
            ))}
          </>
        </section>
      ))}
      <section class="flex flex-col">
        {social && (
          <section class="flex flex-col my-4 mr-4">
            <footer
              class="text-primary text-xl uppercase font-bold"
              style={{ color: titleColor }}
            >
              {social?.title}
            </footer>
            <div class="flex flex-wrap flex-row">
              {social?.items?.map(({ href, image, description, isBlank }) => (
                <a
                  class="mt-2 mr-2"
                  href={href}
                  target={isBlank ? "_blank" : "_self"}
                  rel={isBlank ? "noopener noreferrer" : ""}
                >
                  <Image
                    class="rounded-full bg-slate-200 flex align-middle justify-center"
                    src={image}
                    alt={description}
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </section>
        )}
        {payments && (
          <section class="flex flex-col my-4 mr-4 max-w-[301.5px]">
            <footer
              class="text-primary text-xl uppercase font-bold"
              style={{ color: titleColor }}
            >
              {payments?.title}
            </footer>
            <div class="flex flex-wrap flex-row gap-4">
              {payments?.items?.map(({ image, description }) => (
                <Image
                  class="rounded-lg flex align-middle justify-center"
                  src={image}
                  alt={description}
                  width={50}
                  height={30}
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </section>
        )}
      </section>
      <div class="flex justify-between items-center flex-wrap bg-white gap-4">
        <span>{footerItens.description}</span>
        <div class="flex justify-start gap-4 flex-wrap">
          {footerItens.images.map(({ image, alt, width, height }) => (
            <Image
              class="rounded-lg flex align-middle justify-center"
              src={image}
              alt={alt}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default EmbellezeFaq;
