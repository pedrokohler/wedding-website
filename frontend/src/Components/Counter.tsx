import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

export const CounterSection = () => {
  return (
    <Stack
      style={{
        height: "fit-content",
        width: "100%",
        padding: "2em",
      }}
    >
      <h2>CONTAGEM REGRESSIVA PARA O GRANDE DIA</h2>
      <Counter />
    </Stack>
  );
};

function dateDiff(a: Date, b: Date) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const _MS_PER_HOUR = 1000 * 60 * 60;
  const _MS_PER_MINUTE = 1000 * 60;
  const _MS_PER_SECOND = 1000;
  // Discard the time and time-zone information.
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
  const hours = Math.floor((utc2 - utc1 - days * _MS_PER_DAY) / _MS_PER_HOUR);
  const minutes = Math.floor(
    (utc2 - utc1 - days * _MS_PER_DAY - hours * _MS_PER_HOUR) / _MS_PER_MINUTE
  );
  const seconds = Math.floor(
    (utc2 -
      utc1 -
      days * _MS_PER_DAY -
      hours * _MS_PER_HOUR -
      minutes * _MS_PER_MINUTE) /
      _MS_PER_SECOND
  );

  return [days, hours, minutes, seconds].map((v) =>
    v.toString().padStart(2, "0")
  );
}

const Counter = () => {
  const [counterValues, setCounterValues] = useState(["0", "0", "0", "0"]);

  useEffect(() => {
    const finalDate = new Date("2025/05/31 15:00:00 GMT-0300");
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const timeDifference =
        finalDate <= currentDate
          ? ["0", "0", "0", "0"]
          : dateDiff(currentDate, finalDate);
      setCounterValues(timeDifference);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [setCounterValues]);

  return (
    <Container>
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
  const mediaMatch = window.matchMedia("(min-width: 500px)");
  const [matches, setMatches] = useState(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: any) => setMatches(e.matches);
    mediaMatch.addListener(handler);
    return () => mediaMatch.removeListener(handler);
  }, [setMatches, mediaMatch]);

  const firstRowSizingStyles = matches
    ? {
        fontSize: "3em",
      }
    : {
        fontSize: "2em",
      };
  const secondRowSizingStyles = matches
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
