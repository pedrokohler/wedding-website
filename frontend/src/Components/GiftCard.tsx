import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { convertPriceInCentsToPriceString } from "../utils/price";

export type GiftCardProduct = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
  isActive: boolean;
  productUrl: string;
};

const treatProductTitle = (product: GiftCardProduct) => {
  const MAX_TITLE_LENGTH = 30;

  const slicedTitle =
    product.name.length < MAX_TITLE_LENGTH
      ? product.name
      : `${product.name.slice(0, MAX_TITLE_LENGTH)}...`;

  const lowerCaseWords = slicedTitle.toLowerCase().split(" ");
  const capitalizedWords = [];

  for (let i = 0; i < lowerCaseWords.length; i++) {
    capitalizedWords[i] =
      lowerCaseWords[i][0].toUpperCase() + lowerCaseWords[i].slice(1);
  }
  return capitalizedWords.join(" ");
};

function GiftCard({
  product,
  onClick,
}: {
  product: GiftCardProduct;
  onClick: () => void;
}) {
  const isDisabled = !product.isActive;
  const displayTitle = treatProductTitle(product);
  return (
    <Card
      style={{
        height: "100%",
        alignItems: "flex-start",
        textAlign: "left",
        justifyContent: "space-between",
        opacity: isDisabled ? 0.4 : 1,
      }}
    >
      <Card.Img
        variant="top"
        src={product.imageUrl}
        style={{
          objectFit: "contain",
          height: "256px",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        onClick={isDisabled ? () => {} : onClick}
      />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Card.Title
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>{displayTitle}</div>
          <div style={{ fontSize: "0.65em" }}>
            {convertPriceInCentsToPriceString(product.priceInCents)}
          </div>
        </Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button
          disabled={isDisabled}
          variant="secondary"
          style={{
            width: "40%",
          }}
          onClick={onClick}
        >
          Presentear
        </Button>
      </Card.Body>
    </Card>
  );
}

export default GiftCard;
