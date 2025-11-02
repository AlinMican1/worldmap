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
    | "eight-DesignBox"
    | "showTime-DesignBox"
    | "fullwidth-DesignBox"
    | "previewTime-DesignBox"
    | "transparent-DesignBox"
    | "errorPreview-DesignBox";
  padding?: "none" | "extra-small" | "small" | "medium" | "large";
  centeredY?: "leftY" | "rightY" | "middleY";
  centeredX?: "leftX" | "rightX" | "middleX";
  orientation?: "row" | "column";
  gap?: "gap-none" | "gap-extra-small" | "gap-small" | "gap-medium" | "gap-large" | "gap-xxl";
}

const BoxDesign = forwardRef<HTMLDivElement, BoxDesignProps>(
  (
    {
      children,
      variant,
      centeredY,
      centeredX,
      padding = "small",
      orientation = "column",
      gap,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`box-wrapper ${variant} ${padding} ${orientation} ${centeredX} ${centeredY} ${gap}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default BoxDesign;
