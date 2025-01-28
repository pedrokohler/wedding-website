import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";

import GiftGrid from "./GiftGrid";
import { GiftCardProduct } from "./GiftCard";

export const GiftsList = () => {
  const { isPending, error, data } = useQuery<GiftCardProduct[]>({
    queryKey: ["gifts-gift-list"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/gifts?limit=20`).then((res) =>
        res.json()
      ),
  });

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
    </Stack>
  );
};
