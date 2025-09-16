import { HTMLAttributes, ReactNode, forwardRef } from "react";
import "./boxDesign.css";

interface BoxDesignProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | ReactNode[];
  variant?:
    | "primary-DesignBox"
    | "secondary-DesignBox"
    | "third-DesignBox"
    | "fourth-DesignBox"
    | "fifth-DesignBox"
    | "sixth-DesignBox"
    | "seventh-DesignBox"
    | "eight-DesignBox";
  padding?: "none" | "extra-small" | "small" | "medium" | "large";
  centered?: "left" | "right";
  orientation?: "row" | "column";
}

const BoxDesign = forwardRef<HTMLDivElement, BoxDesignProps>(
  ({ children, variant, centered, padding = "small", orientation = "column", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`box-wrapper ${variant} ${padding} ${orientation} ${centered}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default BoxDesign;
