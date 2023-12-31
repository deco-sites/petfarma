import type { NavItem as INavItem } from "./Header.tsx";
import Image from "apps/website/components/Image.tsx";
import ScrollableNavItem from "$store/components/header/ScrollableNavItem.tsx";

function NavItem({ item, isLast }: { item: INavItem; isLast?: boolean }) {
  const { href, label, children } = item;
  const image = item?.image;

  return (
    <li class="group flex items-center gap-2 relative">
      <a href={href} class="py-3 text-center">
        <span
          class={`py-2 text-[14px] uppercase rounded-md ${
            isLast
              ? "bg-[#C82926] text-white px-4"
              : "hover:bg-[#0F9B3E1A] hover:text-[#0F9B3E] px-2"
          }`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <ScrollableNavItem class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start justify-center gap-6 border-b-2 border-base-200 w-screen">
            <div class="flex w-full max-w-[1440px] px-16 py-8 justify-between">
              <ul
                class="items-start gap-4 max-h-[353px] grid md:grid-cols-3 md:gap-4 w-full"
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
          </ScrollableNavItem>
        )}
    </li>
  );
}

export default NavItem;
