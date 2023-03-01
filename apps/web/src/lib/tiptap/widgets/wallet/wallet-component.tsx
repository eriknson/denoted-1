import { NodeViewWrapper } from "@tiptap/react";
import React from "react";
import { WalletBalanceWidget } from "../../../../components/widgets/Wallet";
import { useState } from "react";

import * as Popover from "@radix-ui/react-popover";

type WalletComponentProps = {
  updateAttributes: (attributes: Record<string, string>) => void;
  node: {
    attrs: {
      address: string | undefined;
      chain: string;
    };
  };
};

export const WalletComponent = (props: WalletComponentProps) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.updateAttributes({
      address: formData.get("address")?.toString() ?? "",
      chain: formData.get("chain")?.toString() ?? "",
    });
  }

  const address = props.node.attrs.address;
  const chain = Number(props.node.attrs.chain);

  const isConfigured = address !== undefined;

  return (
    <NodeViewWrapper as="span">
      <Popover.Root>
        <Popover.Trigger>
          {isConfigured ? (
            <WalletBalanceWidget address={address} chain={chain} />
          ) : (
            <button
              className="rounded-full border border-gray-400 py-0 px-1 leading-normal"
              type="button"
            >
              config
            </button>
          )}
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={5}
            className="data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 s z-50 w-72 rounded-md border border-black bg-white p-4 outline-none dark:border-slate-800 dark:bg-slate-800"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                name="address"
                placeholder={"0xdbe2aff176d2896858f0e34f0a652bf9f4bf0848"}
                defaultValue={address ?? ""}
              />
              <input name="chain" type="number" defaultValue={chain} />
              <button type="submit">save</button>
            </form>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </NodeViewWrapper>
  );
};
