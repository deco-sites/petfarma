import type { ImageWidget } from "apps/admin/widgets.ts";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Style {
  /** @description put the number in Pixels */
  iconSize?: number;
  /** @description put the number in Pixels */
  subtitleFontSize?: number;
  /** @description put the number in Pixels */
  textFontSize?: number; 
  /** @description number in PX */
  gap: number;
  /**
   * @format color
   * @default #FFFFFF
   */
  color?: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  backgroundColor?: string;
  /** @description put the number in Pixels */
  "max-width"?: number;
  /** @description put the number in Pixels */
  height?: number;
  /** @description put the number in Pixels */
  padding?: number;
}

export interface Benefit {
  icon?: AvailableIcons;
  label?: string;
  text?: string;
}

export interface Props {
  title: string;
  /** @description put the number in Pixels */
  titleFontSize: number;
  benefits: Benefit[];
  style: Style;
}

function BenefitComponent({ benefit, iconSize, subtitleFontSize, textFontSize }: { benefit: Benefit; iconSize?: number; subtitleFontSize?: number; textFontSize?: number }) {
  if (!benefit) return null;

  return (

    <div class="flex flex-col gap-3 max-w-[172px]">
      {benefit.icon && (
        <div class="mr-2 text-[#0F9B3E]">
          <Icon
            id={benefit.icon}
            width={iconSize}
            height={iconSize}
            strokeWidth={0.01}
            fill="currentColor"
          />
        </div>
      )}
      <div class="flex flex-col gap-2">
        {benefit.label && <h4 style={{ fontSize: subtitleFontSize }} class="font-semibold">{benefit.label}</h4>}
        {benefit.text && <p style={{ fontSize: textFontSize }}>{benefit.text}</p>}
      </div>
    </div>
  );
}

function Benefits({ title, titleFontSize, benefits, style }: Props) {
  const { subtitleFontSize, textFontSize, iconSize, ...restStyle } = style;
  return (
    <div
      class="rounded-lg"
      style={{
        gap: `${style.gap}px`,
        color: style.color,
        backgroundColor: style.backgroundColor,
        maxWidth: style["max-width"],
        height: style.height,
        padding: style.padding,
      }}
    >
      <div class="flex flex-col text-start w-full gap-6">
      <h3 style={{ fontSize: titleFontSize }} class="text-sm font-bold">{title}</h3>
      <div class="flex flex-col md:flex-row justify-between gap-[42px]">
        {benefits.map((benefit, index) => (
          <BenefitComponent key={index} benefit={benefit} iconSize={iconSize} subtitleFontSize={subtitleFontSize} textFontSize={textFontSize}/>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Benefits;
