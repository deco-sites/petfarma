import VideoComponent from "$store/components/ui/Video.tsx";

export interface Props {
  /**
   * @format color
   * @default #FFFFFF
   */
  color: string;
  /**
   * @format color
   * @default #FFFFFF
   */
  ButtonColor: string;
  videos: {
    videoId: string;
    isCollum: boolean;
    title?: string;
    /**
     * @format textarea
     * @format html
     * @description text to be rendered */
    text?: string;
    href?: string;
    buttonText?: string;
  }[];
  /**
   * @format color
   * @default #FFFF
   */
  backgroundColor?: string;
}

function ImageComponent(
  {
    color,
    ButtonColor,
    videos,
    backgroundColor,
  }: Props,
) {
  return (
    <div
      class="bg-gray-100 flex flex-col m-auto w-full p-4 gap-8 max-w-[1300px] my-16"
      style={{ backgroundColor }}
    >
      <div class={`flex justify-between gap-4 flex-wrap`}>
        {videos.map((
          { videoId, buttonText, text, title, href, isCollum },
        ) => (
          <div
            class={`flex ${
              isCollum ? "flex-col items-center" : ""
            } justify-center md:justify-between gap-4 flex-wrap md:flex-nowrap ${
              title && text
                ? "w-full"
                : `w-full ${isCollum ? "" : "md:w-[48%]"}`
            }`}
          >
            <div
              class={`${
                title && text
                  ? `w-full ${isCollum ? "" : "md:w-[48%]"} h-[355px]`
                  : `w-full`
              } ${isCollum ? "h-[462px]" : "h-[355px]"}`}
              style={{ maxWidth: "830px" }}
            >
              <VideoComponent videoId={videoId} />
            </div>
            {title && text && (
              <div
                class={`flex flex-col items-center justify-center gap-4 w-full ${
                  isCollum ? "" : "md:w-[48%]"
                }`}
              >
                <h2
                  style={{ color }}
                  class="uppercase text-2xl font-bold"
                >
                  {title}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: text,
                  }}
                />
                {buttonText && (
                  <a
                    class="text-white p-3 rounded-xl"
                    style={{ backgroundColor: ButtonColor }}
                    href={href}
                  >
                    {buttonText}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageComponent;
