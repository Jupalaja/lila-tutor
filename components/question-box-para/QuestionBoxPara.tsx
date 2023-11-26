import { ReactNode } from "react";
import styles from "./QuestionBoxPara.module.css";

type QuestionBoxParaProps = {
  readonly children: ReactNode;
  className?: string;
};

export function QuestionBoxPara({ children, className }: QuestionBoxParaProps) {
  const paraClassName = className
    ? `${styles["question-box__para"]} ${className}`
    : styles["question-box__para"];

  return <p className={paraClassName}>{children}</p>;
}
