import { PageTabComponent } from "@/components";
import { MainTablePageThirparty } from "./ui/MainTablePageThirparty";
import { unstable_ViewTransition as ViewTransition } from "react";
async function ThirdPartypage() {
  return (
    <>
      <ViewTransition name="experimental-label">
        <PageTabComponent title={"Terceros"} isHandleTab={false}>
          <MainTablePageThirparty />
        </PageTabComponent>
      </ViewTransition>
    </>
  );
}

export default ThirdPartypage;
