import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GiftCard, { GiftCardProduct } from "./GiftCard";

function GiftGrid({ products }: { products: GiftCardProduct[] }) {
  return (
    <Container fluid>
      <Row
        style={{
          height: "fit-content",
          justifyContent: "center",
        }}
      >
        {products.map((product: GiftCardProduct) => (
          <Col
            xs={12}
            md={6}
            lg={4}
            style={{
              margin: "16px 0",
            }}
            key={product.name}
          >
            <GiftCard product={product} onClick={() => {}} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default GiftGrid;
