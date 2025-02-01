import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import FlowerSeparator from "../../assets/separador2.svg";
import { PageSeparator } from "../PageSeparator";
import GiftGrid from "../GiftGrid";
import { ErrorResponse, GiftsDto, SortFields } from "../../types";
import { determineIfIsErrorResponse } from "../../utils/determineIfIsErrorMessage";

export const GiftsSection = () => {
  const { isPending, error, data } = useQuery<GiftsDto | ErrorResponse>({
    queryKey: ["gifts-home-page"],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_API_URL}/gifts?limit=3&sort=${
          SortFields["manualOrdering:asc"]
        }`
      ).then((res) => res.json()),
  });
  const navigate = useNavigate();
  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");

  return (
    <Stack
      gap={5}
      style={{
        height: "fit-content",
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
      <PageSeparator icon={FlowerSeparator} />
      <h2 className="text-gold">LISTA DE PRESENTES</h2>
      {isPending ? (
        "Carregando..."
      ) : error !== null ? (
        "Ocorreu um erro: " + error.message
      ) : determineIfIsErrorResponse(data) ? (
        "Ocorreu um erro: " + data.message
      ) : (
        <>
          <div
            style={{
              color: "black",
              maxWidth: "80%",
              alignSelf: "center",
            }}
          >
            Estamos muito felizes em ter você conosco. Sua presença já é um
            presente e, se quiser nos agradar ainda mais, será um gesto que
            vamos receber com muito carinho.
          </div>
          <GiftGrid products={data.items} />
          <Button
            style={{
              alignSelf: "center",
              width: isAbove750w ? "420px" : isAbove500w ? "300px" : "90%",
            }}
            size="lg"
            onClick={() => navigate("/presentes")}
          >
            VER LISTA
          </Button>
        </>
      )}
    </Stack>
  );
};
