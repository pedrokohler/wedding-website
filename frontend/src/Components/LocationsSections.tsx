import Stack from "react-bootstrap/Stack";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Church from "../assets/igreja.png";
import { Col, Row } from "react-bootstrap";

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
  const { isAbove750w, isAbove1000w, isAbove500w } = useMediaQuery();

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
          ? "96px 0"
          : "96px 0",
      }}
    >
      <div
        style={{
          position: isAbove1000w ? "absolute" : "relative",
          zIndex: -1,
          alignSelf: "center",
          maxWidth: "70%",
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
