import Controls from "$store/components/institucionais/Controls.tsx";
import { Section } from "deco/blocks/section.ts";

/**
 * @titleBy matcher
 */
export interface Institutional {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  /** @description text to be rendered on top of the image */
  title: string;
  section: Section[];
}

export interface Props {
  Institutionals?: Institutional[];
  menu: {
    title?: string;
    section: { text: string; href: string; isBlank?: boolean }[];
  }[];
  /**
   * @format color
   * @default #FFFFF
   */
  selectedColor?: string;
}

export const loader = (
  { Institutionals = [], menu, selectedColor }: Props,
  req: Request,
) => {
  const Institutional = Institutionals.find(({ matcher }) => {
    return new URLPattern({ pathname: `/institucional${matcher}` }).test(
      req.url,
    );
  });

  return { Institutional, menu, selectedColor };
};

function Menu(
  { Institutional, menu, selectedColor }: ReturnType<typeof loader>,
) {
  if (!Institutional) {
    return <></>;
  }
  const { matcher } = Institutional;
  return (
    <div class="flex justify-between w-11/12 m-auto max-w-[1300px] gap-4 flex-col md:flex-row bg-gray-100 md:bg-transparent py-4 my-12">
      <div class="md:flex flex-col hidden gap-4 min-w-[300px]">
        <div class="flex gap-4 items-center">
          <h2 class="text-primary text-base uppercase font-semibold text-[20px]">
            Institucional
          </h2>
        </div>
        {menu.map(({ section, title }) => (
          <div>
            {title && (
              <h2 class="text-primary text-base uppercase font-semibold">
                {title}
              </h2>
            )}
            <ul class="flex flex-col gap-2">
              {section.map(({ href, text, isBlank }) => (
                <li class="flex justify-start gap-2 items-center">
                  <a
                    href={href}
                    style={{
                      color: href.split("/institucional")[1] === matcher
                        ? selectedColor
                        : "black",
                    }}
                    target={isBlank ? "_blank" : "_self"}
                    rel={isBlank ? "noopener noreferrer" : ""}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Controls menu={menu} matcher={matcher} selectedColor={selectedColor} />
      <div class="bg-gray-100 flex flex-col flex-grow w-full py-4 lg:py-8 rounded-lg max-w-[1000px] px-8 gap-4">
        <h1 class="flex w-full text-xl lg:text-2xl text-primary uppercase font-bold justify-start">
          {Institutional.title}
        </h1>
        <div class="block h-[1px] w-full bg-black opacity-20" />
        {Institutional.section.map((children) => {
          return <children.Component {...children.props} />;
        })}
      </div>
    </div>
  );
}

export default Menu;
