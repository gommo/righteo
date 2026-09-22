import { useEffect } from "react";
import { navigate, useLocation } from "@/lib/router";
import { ReviewShell } from "@/design/review-shell";
import { DesignShowcase } from "@/design/showcase";
import { ProjectDetailScreen } from "@/screens/project-detail";
import { ReconciliationScreen } from "@/screens/reconciliation";
import { TodayScreen } from "@/screens/today";

export function App() {
  const { path } = useLocation();

  useEffect(() => {
    if (path === "/") navigate("/today", { replace: true });
  }, [path]);

  return (
    <ReviewShell>
      {path === "/reconciliation" && <ReconciliationScreen />}
      {path === "/project" && <ProjectDetailScreen />}
      {path === "/design" && <DesignShowcase />}
      {(path === "/today" || path === "/") && <TodayScreen />}
    </ReviewShell>
  );
}
