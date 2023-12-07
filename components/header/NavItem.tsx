import type { NavItem as INavItem } from "./Header.tsx";
import Image from "apps/website/components/Image.tsx";
import { headerHeight } from "./constants.ts";

function NavItem({ item, isLast }: { item: INavItem; isLast?: boolean }) {
  const { href, label, children } = item;
  const image = item?.image;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-3">
        <span
          class={`text-sm px-4 py-2 uppercase rounded-md ${
            isLast
              ? "bg-[#C82926] text-white"
              : "hover:bg-[#0F9B3E1A] hover:text-[#0F9B3E]"
          }`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-b-2 border-base-200 w-screen"
            style={{ top: "68px", left: "0px", marginTop: headerHeight }}
          >
            <div class="flex w-full max-w-[1440px] px-16 py-8 justify-between">
              <ul
                class="items-start gap-4 max-h-[353px] grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full"
                style={{ listStyle: "square" }}
              >
                {children.map((node) => (
                  <li class="break-words">
                    <a class="hover:underline" href={node.href}>
                      <span>{node.label}</span>
                    </a>
                  </li>
                ))}
              </ul>

              {image?.src && (
                <Image
                  class="rounded-lg"
                  src={image.src}
                  alt={image.alt}
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
