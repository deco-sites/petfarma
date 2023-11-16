import type { SectionProps } from "deco/mod.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface layout {
  /** @description Default is 12 */
  numberOfPosts?: number;
}

export interface Data {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
}

export interface Props {
  title?: string;
  instaUser?: string;
  /**
   * @description Get it in Facebook app. Expires every 90 days.
   * @format textarea
   */
  facebookToken: string;
  layout?: layout;
  /**
   * @format color
   * @default #FFFFF
   */
  instaUserColor: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor?: string;
}

export async function loader(
  {
    title,
    instaUser,
    facebookToken,
    layout,
    titleColor,
    instaUserColor,
  }: Props,
  _req: Request,
) {
  const fields = ["media_url", "media_type", "permalink"];
  const joinFields = fields.join(",");
  const url =
    `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;

  const { data } = (await fetch(url).then((r) => r.json()).catch((err) => {
    console.error("error fetching posts from instagram", err);
    return { data: [] };
  })) as {
    data: Data[];
  };

  return {
    data: data.slice(0, layout?.numberOfPosts ?? 12),
    title,
    instaUser,
    layout,
    titleColor,
    instaUserColor,
  };
}

export default function instagramPosts(
  {
    title,
    data,
    titleColor,
    instaUserColor,
    instaUser,
  }: SectionProps<typeof loader>,
) {
  const id = useId();

  const divider = <div class="w-full h-[1px] bg-black bg-opacity-10" />;

  return (
    <section
      class="flex justify-between m-auto md:w-85 w-11/12 flex-col max-w-[1300px] gap-8 py-8"
      id={id}
    >
      <div class="flex justify-between flex-row items-center">
        {title && (
          <h4
            class="text-[20px] leading-[25px] uppercase text-center font-bold mr-4"
            style={{ color: titleColor }}
          >
            <span style={{ color: instaUserColor }}>{instaUser}</span>
            {title}
          </h4>
        )}
        <div class="flex justify-between gap-4">
          <Slider.PrevButton
            class="no-animation btn btn-circle btn-outline w-[40px] min-h-[40px] max-h-[40px] p-0"
            disabled
            style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
          >
            <Icon size={24} id="ChevronLeft" strokeWidth={2} />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation btn btn-circle btn-outline w-[40px] min-h-[40px] max-h-[40px] p-0"
            style={{ border: "1px solid rgba(0, 0, 0, 0.08)" }}
          >
            <Icon size={24} id="ChevronRight" strokeWidth={2} />
          </Slider.NextButton>
        </div>
      </div>
      <>{divider}</>
      <Slider class="carousel carousel-start gap-4 flex items-end bg-transparent py-[24px] rounded-2xl">
        {data.map((item, index) => (
          <Slider.Item index={index} class="slider-item">
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              title="Visite nosso instagram"
              class="rounded-lg overflow-hidden w-full max-w-[350px] sm:max-w-[350px] group"
            >
              {item.media_type === "IMAGE" || "CAROUSEL_ALBUM"
                ? (
                  <Image
                    class="max-w-full max-h-full object-cover w-full group-hover:scale-110  transition duration-400 group-hover:brightness-90 min-w-[167px] min-h-[167  px] md:min-w-[280px] md:min-h-[280px] rounded-lg"
                    src={item.media_url ?? ""}
                    alt="Imagem do instagram"
                    width={350}
                    height={350}
                    loading="lazy"
                  />
                )
                : (
                  <video controls class="max-w-full max-h-full object-cover">
                    <source src={item.media_url}></source>
                  </video>
                )}
            </a>
          </Slider.Item>
        ))}
      </Slider>
      <SliderJS rootId={id} />
    </section>
  );
}
