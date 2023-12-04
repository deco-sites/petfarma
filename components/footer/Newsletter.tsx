// ... (importações e outras partes do código)
import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import Icon from "$store/components/ui/Icon.tsx";

export interface Form {
  placeholder?: string;
  // /** @format html */
  // helpText?: string;
}

export interface Props {
  /** @format textarea */
  description?: string;
  form?: Form;
  layout?: {
    headerFontSize?: "lg" | "normal";
    headerTextColor?: "#0F9B3E" | "white";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bgColor?: "Normal" | "Reverse";
    };
    tiled?: boolean;
  };
}

const DEFAULT_PROPS: Props = {
  description: "",
  form: {
    placeholder: "Digite seu email",
    // helpText:
    //   'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "lg",
    headerTextColor: "#0F9B3E",
    content: {
      border: false,
      alignment: "Side to side",
    },
    tiled: false,
  },
};

function Newsletter(props: Props) {
  const { description, form, layout = {} } = { ...DEFAULT_PROPS, ...props };
  const { tiled = false } = layout;
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = layout && (
    <div class="flex justify-center text-[#0F9B3E]">
      <div class="flex flex-col gap-2">
        <h2
          class={`font-semibold leading-6 lg:leading-8 lg:text-${layout.headerFontSize} text-[${layout.headerTextColor}]`}
        >
          {description}
        </h2>
      </div>
    </div>
  );

  const formLayout = form && (
    <form onSubmit={handleSubmit} action="/" class="flex flex-col gap-4 w-full">
      <div class="flex flex-row gap-3">
        <input
          class="text-[#1F1F1F99] input input-bordered w-full rounded-md"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={`btn ${isReverse ? "btn-accent" : ""} bg-[#0F9B3E] text-white`}
          type="submit"
        >
          <Icon id="PaperPlaneTop" size={24} strokeWidth={2} />
        </button>
      </div>
      {
        /* {form.helpText && (
        <div
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )} */
      }
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-transparent";

  return (
    <div
      class={`${
        bordered ? isReverse ? "bg-transparent" : "bg-transparent" : bgLayout
      } ${bordered ? "p-4 lg:p-16" : "p-0"}`}
    >
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={`container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={`container flex flex-col rounded p-4 gap-6 lg:p-16 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Side to side" && (
        <div
          class={`mx-auto max-w-[1312px] flex flex-col items-center rounded justify-between lg:flex-row p-4 gap-4 lg:p-6 lg:gap-6 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center w-full lg:w-[61%]">
            {formLayout}
          </div>
        </div>
      )}
    </div>
  );
}

export default Newsletter;
