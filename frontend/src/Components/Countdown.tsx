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
  const isAbove500w = useMediaQuery("(min-width: 500px)");
  const isAbove750w = useMediaQuery("(min-width: 750px)");
  const isAbove1000w = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const finalDate = new Date("2025/05/31 15:00:00 GMT-0300");
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
        padding: isAbove1000w
          ? "0 250px"
          : isAbove750w
          ? "0 150px"
          : isAbove500w
          ? "0 100px"
          : "0 50px",
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
