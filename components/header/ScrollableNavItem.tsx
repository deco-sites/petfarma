import type { ComponentChildren } from "preact";
import { useUI } from "$store/sdk/useUI.ts";
import { headerHeight } from "$store/components/header/constants.ts";

export interface Props {
  children?: ComponentChildren;
  class?: string;
}

export default function ScrollableNavItem({ children, ...props }: Props) {
  const { isScrollActive } = useUI();
  return (
    <div
      {...props}
      style={{
        top: isScrollActive.value ? "116px" : headerHeight,
        left: "0px",
      }}
    >
      {children}
    </div>
  );
}
