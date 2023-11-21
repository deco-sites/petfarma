import { Section } from "deco/blocks/section.ts";

export interface Style {
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

export interface Props {
  /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  text: string;
  style: Style;
  children?: Section;
}

function Text({ text, style, children }: Props) {
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
      <div
        class="text-start w-full"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {children && <children.Component {...children.props} />}
    </div>
  );
}

export default Text;
