import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  menu: {
    title?: string;
    section: { text: string; href: string; isBlank?: boolean }[];
  }[];
  matcher: string;
  selectedColor?: string;
}

export default function Controls(
  { menu, matcher, selectedColor }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      class="md:hidden"
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full overflow-y-hidden w-[80vw] max-w-[435px]">
            <div class="flex justify-start gap-4 items-center px-2 h-auto min-h-[71px] w-full flex-wrap">
              <Button
                class="btn btn-ghost bg-[#c829261a] w-[40px] p-[10px] rounded-md"
                onClick={() => open.value = false}
              >
                <Icon
                  id="XMark"
                  size={20}
                  strokeWidth={2}
                  class="text-[#C82926]"
                />
              </Button>
              <h2 class="md:hidden flex-row gap-4 items-center flex">
                <span class="font-medium text-base uppercase text-black">
                  institucional
                </span>
              </h2>
            </div>
            <div class="flex-grow overflow-auto py-4">
              <div class="flex flex-col justify-between w-11/12 m-auto max-w-[1300px] gap-4">
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
            </div>
          </div>
        </>
      }
    >
      <div class="flex w-11/12 m-auto">
        <Button
          class={"md:hidden flex-grow justify-between font-bold text-white uppercase h-[55px] max-h-[55px] bg-primary rounded-lg "}
          onClick={() => {
            open.value = true;
          }}
        >
          institucional
          <div class="bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center">
            <Icon
              id="ChevronRight"
              class="bg-transparent rounded-full text-primary"
              size={20}
            />
          </div>
        </Button>
      </div>
    </Drawer>
  );
}
