import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface barColor {
  /**
   * @format color
   * @default #0F9B3E
   */
  background: string;
  /**
   * @format color
   * @title Text Color
   * @default #FFFFFF
   */
  text: string;
}

export interface Props {
  visible?: boolean;
  /** @format html */
  text?: string;
  layout?: barColor;
  href?: string;
  condition?: string;
}

function Alert(
  {
    visible = true,
    text = "",
    layout,
    href = "/",
    condition = "Válido para Sul, Sudeste e Centro-Oeste",
  }: Props,
) {
  const id = useId();

  if (!visible) {
    return null;
  }

  const sliderStyle = {
    backgroundColor: layout?.background || "#0F9B3E",
  };

  return (
    <div style={sliderStyle} id={id}>
      <div class="max-w-[1440px] flex justify-center sm:justify-around carousel carousel-center w-screen bg-secondary sm:gap-6 h-[40px] mx-auto">
        <div class="hidden sm:flex w-[250px]">
          <img src=".../" alt="" />
        </div>
        <div class="carousel-item">
          <a href={href} class="flex items-center">
            <span
              class="text-[10px] md:text-sm text-secondary-content flex justify-center items-center"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </a>
        </div>
        <span class="hidden sm:flex text-xs md:text-sm text-secondary-content justify-center items-center">
          {condition}
        </span>
      </div>

      {/* <SliderJS rootId={id} interval={interval && interval * 1e3} /> */}
    </div>
  );
}

export default Alert;
