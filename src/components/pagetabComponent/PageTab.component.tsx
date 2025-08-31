import React from "react";
import { Show } from "../show/Show.component";
import { PageTabOption } from "./PageTabsOptions";
import { PageSideTitle } from "./PageSideTitle";

interface Props {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
  isHandleTab: boolean;
  subtitle?: string;
  valueTab?: string[];
  actionChildren?: React.ReactNode[];
}

export const PageTabComponent = (prop: Props) => {
  const { isHandleTab } = prop;
  return (
    <div className="space-y-6 m-2">
      <Show when={isHandleTab} fallback={<PageSideTitle {...prop} />}>
        <PageTabOption {...prop} />
      </Show>
    </div>
  );
};
