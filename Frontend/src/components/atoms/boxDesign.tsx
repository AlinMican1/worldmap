import { ReactNode } from "react";
import "./boxDesign.css";

interface BoxDesignProps {
  children: ReactNode | ReactNode[];
  variant?:
    | "primary-DesignBox"
    | "secondary-DesignBox"
    | "third-DesignBox"
    | "fourth-DesignBox"
    | "fifth-DesignBox"
    | "sixth-DesignBox"
    | "seventh-DesignBox";
  padding?: "none" | "extra-small" | "small" | "medium" | "large";
  centered?: "left" | "right";
  orientation?: "row" | "column";
}

const BoxDesign = ({
  children,
  variant,
  centered,
  padding = "small",
  orientation = "column",
}: BoxDesignProps) => {
  return (
    <div className={`box-wrapper ${variant} ${padding} ${orientation} ${centered}`}>{children}</div>
  );
};
export default BoxDesign;
