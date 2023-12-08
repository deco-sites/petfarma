export interface Props {
  /**
   * @format color
   * @default #FFFFFF
   */
  titleColor: string;
  title: string;
  /**
   * @format textarea
   * @format html
   * @description text to be rendered */
  message: string;
  /**
   * @format color
   * @default #FFFF
   */
  backgroundColor?: string;
}

function Text({ titleColor, title, message, backgroundColor }: Props) {
  return (
    <div
      class="bg-gray-100 flex flex-col m-auto w-full gap-8 max-w-[1300px]"
      style={{ backgroundColor }}
    >
      <div class="flex flex-col items-start justify-center gap-4 w-fit">
        <h2
          style={{ color: titleColor }}
          class="uppercase text-2xl font-bold"
        >
          {title}
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html: message,
          }}
        />
      </div>
    </div>
  );
}

export default Text;
