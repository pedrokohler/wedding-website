import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import {
  useDebounceCallback,
  useLocalStorage,
  useSessionStorage,
} from "usehooks-ts";
import { VisitorsDto } from "../../types";

const updateCount = async ({
  hasVisitedSession,
  hasVisitedUnique,
  mutationUnique,
  mutationSessions,
  setHasVisitedSession,
  setHasVisitedUnique,
  queryClient,
}: any) => {
  if (!hasVisitedUnique) {
    await mutationUnique.mutate();
    setHasVisitedUnique(true);
  }

  if (!hasVisitedSession) {
    await mutationSessions.mutate();
    queryClient.invalidateQueries({ queryKey: ["uniqueSessionsCount"] });
    setHasVisitedSession(true);
  }
};

export const FooterSection = () => {
  const queryClient = useQueryClient();
  const mutationSessions = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/unique-sessions/count`, {
        method: "POST",
      });
    },
  });

  const mutationUnique = useMutation({
    mutationFn: () => {
      return fetch(`${import.meta.env.VITE_API_URL}/unique-visitors/count`, {
        method: "POST",
      });
    },
  });

  const { isPending, error, data } = useQuery<VisitorsDto>({
    queryKey: ["uniqueSessionsCount"],
    refetchInterval: 10_000,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/unique-sessions/count`).then(
        (res) => res.json()
      ),
  });

  const [hasVisitedUnique, setHasVisitedUnique] = useLocalStorage(
    "has-visited-unique",
    false
  );
  const [hasVisitedSession, setHasVisitedSession] = useSessionStorage(
    "has-visited-session",
    false
  );

  const debouncedUpdateCount = useDebounceCallback(updateCount, 2000);

  useEffect(() => {
    debouncedUpdateCount({
      hasVisitedSession,
      hasVisitedUnique,
      mutationUnique,
      mutationSessions,
      setHasVisitedSession,
      setHasVisitedUnique,
      queryClient,
    });
  }, [
    debouncedUpdateCount,
    hasVisitedSession,
    hasVisitedUnique,
    mutationUnique,
    mutationSessions,
    setHasVisitedSession,
    setHasVisitedUnique,
    queryClient,
  ]);

  return (
    <Stack
      style={{
        padding: "1em",
        minHeight: "fit-content",
        height: "20%",
        width: "100vw",
        backgroundColor: "#000C1E",
        justifyContent: "center",
        color: "white",
        fontFamily: "Inter",
      }}
    >
      <div>
        Com amor, Winny e Pedro. Obrigado por fazer parte da nossa história.
      </div>
      <br />
      <div>
        <b
          style={{ color: "#A47124", fontSize: "1.1em", fontWeight: "bolder" }}
        >
          {isPending || error || typeof data.uniqueSessionsCount !== "number"
            ? "????"
            : data.uniqueSessionsCount}
        </b>{" "}
        visitas ao site até o momento
      </div>
      <div>
        <span>&copy;</span> Pedro Köhler {new Date().getFullYear()}
      </div>
    </Stack>
  );
};
