import classNames from 'classnames';
import Image from 'next/image';
import {
  ReactNode,
  WheelEventHandler,
  useRef,
  useState,
  useEffect,
  UIEvent,
} from 'react';
import styles from './DropdownSelect.module.css';

type DropdownSelectProps = {
  readonly className?: string;
  readonly children: ReactNode;
  readonly showUpIndicator?: boolean;
  readonly showDownIndicator?: boolean;
};

export function DropdownSelect({
  className,
  children,
  showUpIndicator = true,
  showDownIndicator = true,
}: DropdownSelectProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isScrollable, setIsScrollable] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    if (target.scrollTop > 0) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };

  const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const checkIfScrollable = () => {
      const el = dropdownRef.current;
      if (el) {
        setIsScrollable(el.scrollHeight > el.clientHeight);
      }
    };

    checkIfScrollable();
    window.addEventListener('resize', checkIfScrollable);

    return () => {
      window.removeEventListener('resize', checkIfScrollable);
    };
  }, [children]);

  const scrollToBottom = () => {
    const dropdownEl = dropdownRef.current;
    if (dropdownEl) {
      dropdownEl.scrollTo({
        top: dropdownEl.scrollTop + dropdownEl.clientHeight / 2,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTup = () => {
    const dropdownEl = dropdownRef.current;
    if (dropdownEl) {
      dropdownEl.scrollTo({
        top: dropdownEl.scrollTop - dropdownEl.clientHeight / 2,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={classNames(styles['dropdown-select'], className)}>
      {showUpIndicator && (
        <button
          className={classNames(styles['dropdown-select__arrow-indicator'], {
            [styles['dropdown-select__arrow-indicator--hidden']]: !hasScrolled,
          })}
          onClick={scrollToTup}
        >
          <span className={styles['arrow-up']}>
            <Image
              src={'/dropdown-arrow.svg'}
              alt="dropdown arrow"
              width={26}
              height={26}
            />
          </span>{' '}
        </button>
      )}
      <div
        className={classNames(styles['dropdown-select__options'])}
        onScroll={handleScroll}
        onWheel={handleWheel}
        ref={dropdownRef}
      >
        {children}
      </div>
      {showDownIndicator && (
        <button
          className={classNames(styles['dropdown-select__arrow-indicator'])}
          onClick={scrollToBottom}
        >
          <span className={styles['arrow-down']}>
            <Image
              src={'/dropdown-arrow.svg'}
              alt="dropdown arrow"
              width={26}
              height={26}
            />
          </span>{' '}
        </button>
      )}
    </div>
  );
}
