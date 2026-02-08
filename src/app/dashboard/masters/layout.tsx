import { PageTabComponent } from "@/components";
import { ViewTransition } from "react";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransition name="experimental-label">
      <PageTabComponent title={"Maestros"} isHandleTab={false}>
        {children}
      </PageTabComponent>
    </ViewTransition>
  );
}
