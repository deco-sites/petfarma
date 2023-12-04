import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useEffect } from 'preact/hooks';
import { useSignal } from "@preact/signals";
import { useState } from "preact/hooks";

export interface Index {
    label: string;
    href: string;
}

export interface Props {
  title?: string;
  indexMenu: Index[];
  content?:{
    image: LiveImage;
    altText: string;
  }
  /** @format html */
  text: string;
}

function InstitutionalPage(
  {
    title,
    indexMenu,
    content,
    text
  }: Props,
) {
  const id = useId();

  const menuVisible = false;

  return (
    <section
      class="flex flex-col md:flex-row justify-between m-auto w-full max-w-[1440px] gap-10 py-4 px-4 md:py-8 md:px-16"
      id={id}
    >

        {/* Mobile */}
        <div class="md:hidden m-4">
        <button class="w-full items-center flex flex-row justify-between text-xl text-white font-semibold bg-[#0F9B3E] rounded-lg px-4 py-3 h-[64px]">
            INSTITUCIONAL<Icon size={24} id="ChevronRight" strokeWidth={2} /> 
        </button>
        {/* Menu de índice em dispositivos móveis */}
        <div class={`absolute top-0 right-0 h-screen w-screen bg-white p-4 ${menuVisible ? '' : 'hidden'}`}>
          <h2 class="text-xl font-semibold">INSTITUCIONAL</h2>
          {indexMenu.map(({ label, href }, index) => (
            <a
              class={`text-sm ${title && title.toLowerCase() === label.toLowerCase() ? 'text-green-500' : ''}`}
              href={href}
            >
              {label}
            </a>
          ))}
        </div>
        </div>
        <div class="hidden md:flex flex-col justify-start gap-3">
        <h2 class="text-xl py-3 font-semibold">INSTITUCIONAL</h2>
        {indexMenu.map(({ label, href }, index) => (
          <a
            class={`hover:text-green-500 text-sm ${title && title.toLowerCase() === label.toLowerCase() ? 'text-green-500' : ''}`}
            href={href}
          >
            {label}
          </a>
        ))}
        </div>
        <div class="flex flex-col items-center justify-center gap-8 px-4 py-6 md:py-8 md:px-10 w-full md:max-w-[1040px]">
            <h1 class="title-h1 uppercase flex justify-start font-semibold text-3xl w-full">{title}</h1>
            <Image
                src={content?.image || ""}
                alt={content?.altText}
                class="rounded-lg mb-2"
                width={956}
                height={255}
            />
            <div class="flex flex-col gap-3 text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: text || "" }} />
        </div>
    </section>
  );
}

export default InstitutionalPage;
