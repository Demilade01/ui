import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSorokit } from "@/context/SorokitProvider";
import { cn } from "@/lib/utils";
import type { NetworkName } from "@/lib/client";

const NETWORKS: { name: NetworkName; label: string; dot: string }[] = [
  { name: "mainnet", label: "Mainnet", dot: "bg-green" },
  { name: "testnet", label: "Testnet", dot: "bg-orange" },
  { name: "futurenet", label: "Futurenet", dot: "bg-purple" },
  { name: "localnet", label: "Localnet", dot: "bg-ink-3" },
];

export function NetworkSwitcher() {
  const { network, switchNetwork } = useSorokit();
  const current = NETWORKS.find((n) => n.name === network?.name) ?? NETWORKS[1];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="inline-flex items-center gap-2 h-8 px-3.5 rounded-lg bg-surface-2 border border-line hover:border-line-2 transition-colors cursor-pointer text-[12px] text-ink-2 focus-visible:outline-none">
          <span
            className={cn("w-1.5 h-1.5 rounded-full shrink-0", current.dot)}
          />
          {current.label}
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            className="opacity-40 ml-0.5"
          >
            <path
              d="M1.5 3L4 5.5L6.5 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          className="z-50 min-w-[160px] rounded-xl border border-line bg-surface p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
        >
          {NETWORKS.map((net) => (
            <DropdownMenu.Item
              key={net.name}
              onSelect={() => switchNetwork(net.name)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] cursor-pointer outline-none transition-colors",
                network?.name === net.name
                  ? "bg-surface-2 text-ink font-medium"
                  : "text-ink-2 hover:bg-surface-2 hover:text-ink",
              )}
            >
              <span
                className={cn("w-1.5 h-1.5 rounded-full shrink-0", net.dot)}
              />
              {net.label}
              {network?.name === net.name && (
                <svg
                  className="ml-auto"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M2 5L4.5 7.5L8.5 2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
