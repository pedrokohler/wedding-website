import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "usehooks-ts";

function dateDiff(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const _MS_PER_HOUR = 1000 * 60 * 60;
  const _MS_PER_MINUTE = 1000 * 60;
  const _MS_PER_SECOND = 1000;

  const utc1 = Date.UTC(
    a.getFullYear(),
    a.getMonth(),
    a.getDate(),
    a.getHours(),
    a.getMinutes(),
    a.getSeconds()
  );
  const utc2 = Date.UTC(
    b.getFullYear(),
    b.getMonth(),
    b.getDate(),
    b.getHours(),
    b.getMinutes(),
    b.getSeconds()
  );

  const days = Math.floor((utc2 - utc1) / _MS_PER_DAY);
  const daysInMs = days * _MS_PER_DAY;

  const hours = Math.floor((utc2 - utc1 - daysInMs) / _MS_PER_HOUR);
  const hoursInMs = hours * _MS_PER_HOUR;

  const minutes = Math.floor(
    (utc2 - utc1 - daysInMs - hoursInMs) / _MS_PER_MINUTE
  );
  const minutesInMs = minutes * _MS_PER_MINUTE;

  const seconds = Math.floor(
    (utc2 - utc1 - daysInMs - hoursInMs - minutesInMs) / _MS_PER_SECOND
  );

  return [days, hours, minutes, seconds].map((v) =>
    v.toString().padStart(2, "0")
  );
}

export const Countdown = () => {
  const [counterValues, setCounterValues] = useState(["0", "0", "0", "0"]);
  const isAbove400w = useMediaQuery("(min-width: 400px)");
  const isAbove550w = useMediaQuery("(min-width: 550px)");
  const isAbove770w = useMediaQuery("(min-width: 770px)");
  const isAbove1080w = useMediaQuery("(min-width: 1080px)");

  useEffect(() => {
    const finalDate = new Date(import.meta.env.VITE_BIG_DAY);
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const timeDifference =
        finalDate <= currentDate
          ? ["0", "0", "0", "0"]
          : dateDiff(currentDate, finalDate);
      setCounterValues(timeDifference);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [setCounterValues]);

  return (
    <Container
      style={{
        padding: isAbove1080w
          ? "0 250px"
          : isAbove770w
          ? "0 150px"
          : isAbove550w
          ? "0 100px"
          : isAbove400w
          ? "0 50px"
          : "0 16px",
      }}
    >
      <Row xs="4">
        {["dias", "horas", "minutos", "segundos"].map((timeRelatedTerm, i) => (
          <CounterColumn
            key={timeRelatedTerm}
            textAbove={counterValues[i]}
            textBelow={timeRelatedTerm}
          />
        ))}
      </Row>
    </Container>
  );
};

const CounterColumn = ({
  textAbove,
  textBelow,
}: {
  textAbove: string;
  textBelow: string;
}) => {
  const isAbove500w = useMediaQuery("(min-width: 500px)");

  const firstRowSizingStyles = isAbove500w
    ? {
        fontSize: "3em",
      }
    : {
        fontSize: "2em",
      };
  const secondRowSizingStyles = isAbove500w
    ? {
        fontSize: "1em",
      }
    : {
        fontSize: "0.8em",
      };
  return (
    <Col>
      <Stack>
        <div
          style={{
            color: "#1b4a92",
            fontWeight: "700",
            ...firstRowSizingStyles,
          }}
        >
          {textAbove}
        </div>
        <div
          style={{
            ...secondRowSizingStyles,
          }}
        >
          {textBelow}
        </div>
      </Stack>
    </Col>
  );
};
