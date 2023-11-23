import { questrialFont } from "@/utils";
import {
  ChangeEventHandler,
  ForwardedRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";
import styles from "./QuestionInputNumber.module.css";
import classNames from "classnames";

type QuestionInputNumberProps = {
  readonly placeholder?: string;
  readonly className?: string;
  readonly value?: string;
  readonly onChange?: ChangeEventHandler<HTMLInputElement>;
};

const QuestionInputNumber = forwardRef(
  (
    { placeholder, className, value, onChange }: QuestionInputNumberProps,
    passedRef: ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    }, []);

    return (
      <input
        ref={passedRef ?? inputRef}
        className={classNames(
          styles["question-input__number"],
          questrialFont.className,
          className
        )}
        type="tel"
        placeholder={placeholder ?? ""}
        value={value}
        onChange={onChange}
        pattern="[0-9]*"
        inputMode="numeric"
      />
    );
  }
);

QuestionInputNumber.displayName = "QuestionInputNumber";

export { QuestionInputNumber };
