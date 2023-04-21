import { NodeViewWrapper } from "@tiptap/react";
import React, { useEffect, useState } from "react";

import * as Popover from "@radix-ui/react-popover";
import * as chains from "wagmi/chains";
import { CommandExtensionProps } from "../../../lib/tiptap/types";
import { NftWidget, NftWidgetProps } from "./Nft";
import { Label } from "../../Label";

export const NftConfig = (props: CommandExtensionProps<NftWidgetProps>) => {
  const [isOpen, setOpen] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    props.updateAttributes({
      address: formData.get("address")?.toString() ?? undefined,
      chain: formData.get("chain")
        ? Number(formData.get("chain")?.toString())
        : undefined,
      tokenId: Number(formData.get("tokenId")?.toString()) ?? undefined,
    });

    setOpen(false);

    props.editor.view.dom.focus();
  }

  const { property, address, chain, tokenId } = props.node.attrs;

  const isConfigured =
    (property !== undefined && address !== undefined && chain !== undefined) ||
    tokenId !== undefined;

  useEffect(() => {
    if (!isConfigured) {
      setOpen(true);
    }
  }, [isConfigured]);

  return (
    <NodeViewWrapper as="span">
      {isConfigured && !props.editor.isEditable && (
        <NftWidget property={property} address={address} chain={chain} />
      )}
      {props.editor.isEditable && (
        <Popover.Root
          defaultOpen={!isConfigured}
          onOpenChange={setOpen}
          open={isOpen}
        >
          <Popover.Trigger>
            {isConfigured ? (
              <NftWidget
                property={property}
                address={address}
                chain={chain}
                tokenId={tokenId}
              />
            ) : (
              <span className="rounded-full border border-slate-300 py-0 px-1 leading-normal text-slate-500">
                setup
              </span>
            )}
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              sideOffset={5}
              align="start"
              className="s z-50 w-64 overflow-hidden rounded-2xl bg-slate-100 p-4 outline-none"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-start gap-4"
                name="graph-setup"
              >
                <Label label="Address">
                  <input
                    name="address"
                    placeholder="0x"
                    defaultValue={address ?? ""}
                    className="rounded-lg bg-slate-200 px-3 py-2"
                    required
                  />
                </Label>
                {property === "image" && (
                  <Label label="Token Id">
                    <input
                      name="tokenId"
                      placeholder="1337"
                      defaultValue={tokenId ?? ""}
                      className="rounded-lg bg-slate-200 px-3 py-2"
                      required
                    />
                  </Label>
                )}
                <Label label="Chain">
                  <select
                    name="chain"
                    defaultValue={chain ?? ""}
                    className="rounded-lg border-none bg-slate-200"
                  >
                    {[chains.mainnet, chains.polygon].map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                </Label>
                <button
                  type="submit"
                  className="rounded-full border border-black px-2 py-0 text-black"
                >
                  save
                </button>
              </form>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
    </NodeViewWrapper>
  );
};
