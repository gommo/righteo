import { useEffect, useState } from "react";
import { Stack } from "@/ui/primitives/layout";
import { Surface } from "@/ui/primitives/surface";
import { Text } from "@/ui/primitives/text";

/**
 * Part of the review harness, not the product. It exists to prove the M0
 * spike claims from a running bundle. Delete it with ReviewShell.
 */
type StorageProbe = {
  databasePath: string;
  launches: number;
  firstLaunch: string;
  latestLaunch: string;
};

type Probe =
  | { state: "browser" }
  | { state: "loading" }
  | { state: "failed"; message: string }
  | { state: "ready"; value: StorageProbe };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="column" gap={2}>
      <Text role="label">{label}</Text>
      <Text role="mono">{value}</Text>
    </Stack>
  );
}

export function ShellProbe() {
  const [probe, setProbe] = useState<Probe>({ state: "loading" });

  useEffect(() => {
    if (!("__TAURI_INTERNALS__" in window)) {
      setProbe({ state: "browser" });
      return;
    }
    import("@tauri-apps/api/core")
      .then(({ invoke }) => invoke<StorageProbe>("storage_probe"))
      .then((value) => setProbe({ state: "ready", value }))
      .catch((error: unknown) =>
        setProbe({ state: "failed", message: String(error) }),
      );
  }, []);

  return (
    <Stack direction="column" gap={24}>
      <Stack direction="column" gap={8}>
        <Text role="display">Shell probe</Text>
        <Text role="secondary">
          Evidence for the M0 spike. Local storage is read from SQLite in the
          Rust process, not from the browser, so the launch count only survives
          a full quit and relaunch if the real storage path works.
        </Text>
      </Stack>

      <Surface level="raised" className="p-[24px]">
        {probe.state === "loading" && <Text role="body">Reading.</Text>}

        {probe.state === "browser" && (
          <Stack direction="column" gap={8}>
            <Text role="body">Running in a browser, so there is no shell.</Text>
            <Text role="secondary">
              Open the bundled application to see the storage probe.
            </Text>
          </Stack>
        )}

        {probe.state === "failed" && (
          <Stack direction="column" gap={8}>
            <Text role="body">The storage command failed.</Text>
            <Text role="mono">{probe.message}</Text>
          </Stack>
        )}

        {probe.state === "ready" && (
          <Stack direction="column" gap={20}>
            <Row label="Launches recorded" value={String(probe.value.launches)} />
            <Row label="First launch" value={probe.value.firstLaunch} />
            <Row label="Latest launch" value={probe.value.latestLaunch} />
            <Row label="Database" value={probe.value.databasePath} />
          </Stack>
        )}
      </Surface>
    </Stack>
  );
}
