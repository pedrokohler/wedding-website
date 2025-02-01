import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/esm/Button";
import { useMediaQuery } from "usehooks-ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

import GiftGrid from "./GiftGrid";
import { ErrorResponse, GiftsDto, SortFields } from "../types";
import { determineIfIsErrorResponse } from "../utils/determineIfIsErrorMessage";
import { Select } from "./Select";

const DEFAULT_ORDERING = SortFields["manualOrdering:asc"];
const ITEMS_PER_PAGE = 12;

export const GiftsList = () => {
  const [sort, setSort] = useState(DEFAULT_ORDERING);
  const { isPending, error, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery<GiftsDto | ErrorResponse>({
      initialPageParam: 0,
      getNextPageParam: (lastPage) => (lastPage as GiftsDto)?.nextPage,
      queryKey: ["gifts-gift-list", sort],
      queryFn: ({ pageParam }) => {
        return fetch(
          `${
            import.meta.env.VITE_API_URL
          }/gifts?limit=${ITEMS_PER_PAGE}&sort=${sort}&skip=${
            (pageParam as number) * ITEMS_PER_PAGE
          }`
        ).then((res) => res.json());
      },
    });

  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");

  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
        minHeight: "100vh",
        width: "100%",
        padding: isAbove1000w
          ? "32px 196px"
          : isAbove750w
          ? "32px 154px"
          : isAbove500w
          ? "32px 128px"
          : "32px 64px",
      }}
    >
      <h2 className="text-gold">LISTA DE PRESENTES</h2>
      <div
        style={{
          color: "black",
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        Estamos muito felizes em ter você conosco. Sua presença já é um presente
        e, se quiser nos agradar ainda mais, será um gesto que vamos receber com
        muito carinho.
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: isAbove1000w ? "flex-end" : "center",
        }}
      >
        <div
          style={{
            padding: "0 12px",
          }}
        >
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortFields)}
            options={[
              { label: "Ordenação padrão", value: DEFAULT_ORDERING },
              {
                label: "Ordenar por ordem alfabética [A-Z]",
                value: SortFields["name:asc"],
              },
              {
                label: "Ordenar por ordem alfabética [Z-A]",
                value: SortFields["name:desc"],
              },
              {
                label: "Ordenar pelo menor preço",
                value: SortFields["priceInCents:asc"],
              },
              {
                label: "Ordenar pelo maior preço",
                value: SortFields["priceInCents:desc"],
              },
            ]}
          />
        </div>
      </div>

      {isPending ? (
        "Carregando..."
      ) : error !== null ? (
        "Ocorreu um erro: " + error.message
      ) : data.pages.every((page) => determineIfIsErrorResponse(page)) ? (
        "Ocorreu um erro: " + data.pages[0].message
      ) : (
        <GiftGrid
          products={data.pages
            .filter((page) => !determineIfIsErrorResponse(page))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            .flatMap((page) => page.items)}
        />
      )}

      {hasNextPage ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              maxWidth: "400px",
              width: "100%",
            }}
            onClick={() => fetchNextPage()}
          >
            Carregar mais
          </Button>
        </div>
      ) : (
        <></>
      )}
    </Stack>
  );
};
