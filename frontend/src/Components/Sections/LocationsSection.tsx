import Stack from "react-bootstrap/Stack";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "usehooks-ts";

import Church from "../../assets/igreja.svg";

const Address = ({
  eventName,
  locationName,
  firstLine,
  secondLine,
}: {
  eventName: string;
  locationName: string;
  firstLine: string;
  secondLine: string;
}) => {
  return (
    <Stack>
      <h2>{eventName}</h2>
      <h5 style={{ color: "black", fontWeight: "bold" }}>{locationName}</h5>
      <p style={{ color: "black" }}>{firstLine}</p>
      <p style={{ color: "black" }}>{secondLine}</p>
    </Stack>
  );
};

const OneColumnLocationSection = () => {
  return (
    <Stack
      style={{
        maxWidth: "70%",
        alignSelf: "center",
        alignItems: "center",
      }}
      gap={5}
    >
      <Address
        eventName="CERIMÔNIA"
        locationName="Basílica Nossa Senhora de Lourdes"
        firstLine="Rua da Bahia, 1596"
        secondLine="Lourdes, Belo Horizonte"
      />
      <Address
        eventName="RECEPÇÃO"
        locationName="Liac eventos"
        firstLine="Av. Otacílio Negrão de Lima, 7180"
        secondLine="Bandeirantes (Pampulha)"
      />
    </Stack>
  );
};

const TwoColumnsLocationSection = () => {
  return (
    <Row>
      <Col>
        <Address
          eventName="CERIMÔNIA"
          locationName="Basílica Nossa Senhora de Lourdes"
          firstLine="Rua da Bahia, 1596"
          secondLine="Lourdes, Belo Horizonte"
        />
      </Col>
      <Col>
        <Address
          eventName="RECEPÇÃO"
          locationName="Liac eventos"
          firstLine="Av. Otacílio Negrão de Lima, 7180"
          secondLine="Bandeirantes (Pampulha)"
        />
      </Col>
    </Row>
  );
};

export const LocationsSection = () => {
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
          ? "96px 256px"
          : isAbove750w
          ? "96px 128px"
          : isAbove500w
          ? "48px 0"
          : "48px 0",
      }}
    >
      <div
        style={{
          position: isAbove1000w ? "absolute" : "relative",
          zIndex: -1,
          alignSelf: "center",
          maxWidth: "70%",
          marginLeft: "20px",
        }}
      >
        <img
          style={{
            width: "100%",
          }}
          src={Church}
        />
      </div>

      {isAbove750w ? (
        <TwoColumnsLocationSection />
      ) : (
        <OneColumnLocationSection />
      )}
    </Stack>
  );
};
