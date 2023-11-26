import classNames from "classnames";
import { ReactNode, WheelEventHandler } from "react";
import styles from "./DropdownSelect.module.css";

type DropdownSelectProps = {
  readonly className?: string;
  readonly children: ReactNode;
};

export function DropdownSelect({ className, children }: DropdownSelectProps) {
  const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={classNames(styles["dropdown-select__options"], className)}
      onWheel={handleWheel}
    >
      {children}
    </div>
  );
}
