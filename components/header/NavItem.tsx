import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  return (
    <li class="group flex items-center">
      <a href={url} class="px-4 py-3">
        <span class="text-sm px-4 py-2 uppercase rounded-md hover:bg-[#0F9B3E1A] hover:text-[#0F9B3E]">
          {name}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-b-2 border-base-200 w-screen"
            style={{ top: "68px", left: "0px", marginTop: headerHeight }}
          >
            <div class="flex w-full max-w-[1440px] px-16 py-8 justify-between">
              <ol class="items-start gap-4 max-h-[353px] grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full">
                {children.map((node) => (
                  <li class="break-words">
                    <a class="hover:underline" href={node.url}>
                      <span>{node.name}</span>
                    </a>

                    {
                      /* <ul class="flex flex-col gap-1 mt-4">
                  {node.children?.map((leaf) => (
                    <li>
                      <a class="hover:underline" href={leaf.url}>
                        <span class="text-xs">{leaf.name}</span>
                      </a>
                    </li>
                  ))}
                </ul> */
                    }
                  </li>
                ))}
                <li>
                  <a class="text-sm text-[#0F9B3E]" href={item.url}>
                    Ver tudo em {name}
                  </a>
                </li>
              </ol>

              {image?.url && (
                <Image
                  class="rounded-lg"
                  src={image.url}
                  alt={image.alternateName}
                  width={440}
                  height={290}
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
