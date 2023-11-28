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

function Alert({visible = true, text = '', layout,  href = '/', condition = 'Válido para Sul, Sudeste e Centro-Oeste'}: Props) {
  const id = useId();

  if (!visible) {
    return null; 
  }

  const sliderStyle = {
    backgroundColor: layout?.background || '#0F9B3E',
  };

  return (
    <div id={id}>
      <div style={sliderStyle} class="flex justify-around carousel carousel-center w-screen bg-secondary gap-6 h-[40px]">
          <div class="w-[250px]">
            <img src='.../' alt="" />
          </div>
          <div class="carousel-item">
          <a href={href} class="flex items-center">
              <span class="text-xs md:text-sm text-secondary-content flex justify-center items-center" dangerouslySetInnerHTML={{ __html: text }} />
          </a>
          </div>
          <span class="text-xs md:text-sm text-secondary-content flex justify-center items-center">{condition}</span>
      </div>

      {/* <SliderJS rootId={id} interval={interval && interval * 1e3} /> */}
    </div>
  );
}

export default Alert;
