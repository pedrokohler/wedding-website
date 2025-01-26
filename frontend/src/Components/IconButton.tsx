import { Icon } from "react-bootstrap-icons";

export const IconButton = ({
  icon: IconComponent,
  onClick,
}: {
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
      }}
      className="icon-button"
      onClick={onClick}
    >
      <IconComponent />
    </div>
  );
};
