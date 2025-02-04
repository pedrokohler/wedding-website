import { Icon } from "react-bootstrap-icons";

export const IconButton = ({
  style = {},
  icon: IconComponent,
  onClick,
}: {
  style?: React.CSSProperties;
  icon: Icon;
  onClick: () => void;
}) => {
  return (
    <div
      style={{
        display: "inline",
        height: "fit-content",
        width: "fit-content",
        padding: "0 16px",
        ...style,
      }}
      className="icon-button"
      onClick={onClick}
    >
      <IconComponent />
    </div>
  );
};
