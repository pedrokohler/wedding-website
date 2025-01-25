import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export type GiftCardProduct = {
  name: string;
  description: string;
  imageUrl: string;
  priceInCents: number;
};

function GiftCard({
  product,
  onClick,
}: {
  product: GiftCardProduct;
  onClick: () => void;
}) {
  return (
    <Card
      style={{
        height: "100%",
        alignItems: "flex-start",
        textAlign: "left",
        justifyContent: "space-between",
      }}
    >
      <Card.Img variant="top" src={product.imageUrl} />
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
          <div>{product.name}</div>
          <div style={{ fontSize: "0.65em" }}>
            R${(product.priceInCents / 100).toString()}
          </div>
        </Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button
          variant="secondary"
          style={{
            width: "40%",
            // backgroundColor: "#a47124",
            // borderColor: "#a47124",
            // minWidth: "fit-content",
            // marginTop: "16px",
            // "&:hover": {
            //   background: "#efefef",
            // },
          }}
          onClick={onClick}
        >
          Comprar
        </Button>
      </Card.Body>
    </Card>
  );
}

export default GiftCard;
