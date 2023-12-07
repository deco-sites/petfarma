import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <div class="flex items-center justify-center w-[34px] h-[36px] bg-[#0F9B3E1A] rounded-md">
        <Icon id="Bars3" size={24} strokeWidth={0.01} />
      </div>
    </Button>
  );
}
