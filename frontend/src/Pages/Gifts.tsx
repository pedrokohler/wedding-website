import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";

import Signature from "../assets/signature-gift-page.svg";
import { GiftsList } from "../Components/GitftsList";

export const GiftsPage = () => {
  const navigate = useNavigate();
  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");
  return (
    <Stack gap={2}>
      <img
        src={Signature}
        style={{
          padding: isAbove1000w
            ? "160px"
            : isAbove750w
            ? "64px"
            : isAbove500w
            ? "32px"
            : "16px",
          margin: "0 0 0 20px",
          width: "calc(100% - 20px)",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      />
      <GiftsList />
    </Stack>
  );
};
