import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GiftCard, { GiftCardProduct } from "./GiftCard";
import { GiftModal } from "./GiftModal";

function GiftGrid({ products }: { products: GiftCardProduct[] }) {
  const [modalShow, setModalShow] = useState(false);
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
            <GiftCard product={product} onClick={() => setModalShow(true)} />
          </Col>
        ))}
      </Row>
      <GiftModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default GiftGrid;
