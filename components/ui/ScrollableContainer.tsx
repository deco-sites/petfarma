import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";
import {
  headerHeight,
  navbarHeight,
} from "$store/components/header/constants.ts";

export interface Props {
  children?: ComponentChildren;
  class?: string;
}

export function ScrollaberNavItem({ children, ...props }: Props) {
  const { isScrollActive } = useUI();
  return (
    <div
      {...props}
      style={{
        top: isScrollActive.value ? navbarHeight : headerHeight,
        left: "0px",
      }}
    >
      {children}
    </div>
  );
}

function ScrollableContainer({ children }: Props) {
  const { isScrollActive } = useUI();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        isScrollActive.value = true;
      } else {
        isScrollActive.value = false;
      }
    };
    self.addEventListener("scroll", handleScroll);

    return () => {
      self.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      class={`${
        isScrollActive.value
          ? "opacity-0 h-0 overflow-hidden group-hover/scrollable:h-full group-hover/scrollable:opacity-100"
          : "block opacity-100"
      } duration-500 transition-all ease-in-out`}
    >
      {children}
    </div>
  );
}

export default ScrollableContainer;
