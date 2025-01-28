import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import FlowerSeparator from "../../assets/separador2.svg";
import { PageSeparator } from "../PageSeparator";
import GiftGrid from "../GiftGrid";
import { GiftCardProduct } from "../GiftCard";
import { useQuery } from "@tanstack/react-query";

export const GiftsSection = () => {
  const { isPending, error, data } = useQuery<GiftCardProduct[]>({
    queryKey: ["gifts-home-page"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/gifts?limit=3`).then((res) =>
        res.json()
      ),
  });
  const navigate = useNavigate();
  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");

  if (isPending) return "Carregando...";

  if (error || !Array.isArray(data)) {
    console.error(error || data);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return "Ocorreu um erro: " + (error?.message || data?.message);
  }

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
      <div
        style={{
          color: "black",
          maxWidth: "80%",
          alignSelf: "center",
        }}
      >
        Donec dignissim et libero sed congue. Cras sit amet vestibulum diam.
        Etiam ut varius turpis. Proin luctus efficitur mi, nec sollicitudin
        tellus tincidunt sed.
      </div>
      <GiftGrid products={data} />
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
    </Stack>
  );
};
