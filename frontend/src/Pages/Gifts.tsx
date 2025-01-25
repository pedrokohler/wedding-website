import { Stack } from "react-bootstrap";
import { GiftsList } from "../Components/GitftsList";

export const GiftsPage = () => {
  return (
    <Stack gap={2}>
      <div>Winny & Pedro</div>
      <GiftsList />
    </Stack>
  );
};
