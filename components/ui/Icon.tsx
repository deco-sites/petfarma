import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ArrowsPointingOut"
  | "Bars3"
  | "Bird"
  | "Bull"
  | "ChevronLeft"
  | "ChevronRight"
  | "ChevronUp"
  | "ChevronDown"
  | "CreditCard"
  | "Cat"
  | "Dog"
  | "DogShield"
  | "CatShield"
  | "Deco"
  | "Diners"
  | "Discord"
  | "Discount"
  | "Elo"
  | "Facebook"
  | "FilterList"
  | "Heart"
  | "Horse"
  | "Instagram"
  | "Linkedin"
  | "Minus"
  | "MapPin"
  | "MagnifyingGlass"
  | "Mastercard"
  | "Message"
  | "Phone"
  | "Pix"
  | "Plus"
  | "QuestionMarkCircle"
  | "QuestionMarkCircleHeader"
  | "Return"
  | "Ruler"
  | "ShoppingCart"
  | "Star"
  | "star"
  | "starVazia"
  | "Tiktok"
  | "Trash"
  | "Truck"
  | "TRUCK-FAST"
  | "Twitter"
  | "User"
  | "UserHeader"
  | "Visa"
  | "WhatsApp"
  | "XMark"
  | "Zoom";

interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon(
  { id, strokeWidth = 16, size, width, height, ...otherProps }: Props,
) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
