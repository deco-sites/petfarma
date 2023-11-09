import type { ComponentChildren, JSX } from "preact";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  index: number;
  children?: ComponentChildren;
  class?: string;
}

function Dot({ index, children, ...otherProps }: Props) {
  return (
    <button
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="next" aria-label="Next item" {...props} />;
}

function PrevButton(props: JSX.IntrinsicElements["button"]) {
  return <button data-slide="prev" aria-label="Previous item" {...props} />;
}

Slider.Dot = Dot;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;
