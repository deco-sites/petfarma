import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";

export type ISection = {
  title: string;
  items?: Array<{
    label: string;
    href?: string;
  }>;
};

export type SocialMedia = {
  image: LiveImage;
  href: string;
  description?: string;
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
      alt: string;
    }[]
  }
}

function EmbellezeFaq({ section, social, payments, titleColor, footerItens }: Props) {
  return (
    <footer class="flex-wrap flex justify-between m-auto md:w-85 w-11/12 max-w-[1300px] flex-col md:flex-row py-[42px]">
      {section?.map(({ title, items }: ISection) => (
        <section class="flex flex-col my-4 mr-4">
          <h4
            class="text-primary text-xl uppercase font-bold"
            style={{ color: titleColor }}
          >
            {title}
          </h4>
          <>
            {items?.map(({ label, href }) => (
              <a class="mt-2" href={href}>{label}</a>
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
              {social?.items?.map(({ href, image, description }) => (
                <a class="mt-2 mr-2" href={href}>
                  <img
                    class="rounded-full bg-slate-200 flex align-middle justify-center"
                    src={image}
                    alt={description}
                    width="40px"
                    height="40px"
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
                <img
                  class="rounded-lg flex align-middle justify-center"
                  src={image}
                  alt={description}
                  width="50px"
                  height="30px"
                />
              ))}
            </div>
          </section>
        )}
      </section>
      <div class="flex justify-between flex-wrap bg-white gap-4 w-full">
          <span>{footerItens.description}</span>
          <div class="flex justify-start gap-4 flex-wrap">{footerItens.images.map(({image, alt}) => <img
                  class="rounded-lg flex align-middle justify-center"
                  src={image}
                  alt={alt}
                  width="66px"
                  height="50px"
                /> )}
          </div>
      </div>
    </footer>
  );
}

export default EmbellezeFaq;