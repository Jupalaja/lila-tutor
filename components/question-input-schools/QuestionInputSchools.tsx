import {
  DropdownSelect,
  DropdownSelectOption,
  QuestionInputText,
} from '../index';
import styles from './QuestionInputSchools.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import { useSchools } from '@/hooks';
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SET_SCHOOL } from '@/reducers';
import { useQuestions, useSharedStates } from '@/contexts';
import { SchoolsProps, ObjectType } from '@/types';

type QuestionInputSchoolsProps = SchoolsProps & {
  readonly setErrorMsg: Dispatch<SetStateAction<ObjectType>> | undefined;
};

export function QuestionInputSchools({
  showSchoolsList,
  setShowSchoolsList,
  setErrorMsg,
}: QuestionInputSchoolsProps) {
  const { schools } = useSchools();
  const { state, dispatch } = useQuestions();
  const { handleOkClick } = useSharedStates();

  const { school } = state;
  const inputTextRef = useRef<HTMLInputElement>(null);
  const [localSchool, setLocalSchool] = useState(school);
  const [optionClicked, setOptionClicked] = useState(false);
  const [filterSchools, setFilteredSchools] = useState<string[]>([]);

  useEffect(() => {
    if (optionClicked) {
      return;
    }

    setFilteredSchools(
      schools.filter((_school) =>
        _school.toLowerCase().includes(localSchool.toLowerCase())
      )
    );
  }, [schools, localSchool, optionClicked]);

  useEffect(() => {
    setTimeout(() => {
      inputTextRef.current?.focus();
    }, 500);
  }, []);

  useEffect(() => {
    if (localSchool && filterSchools.length === 0 && school !== localSchool) {
      setErrorMsg &&
        setErrorMsg((prevValue) => ({
          ...prevValue,
          school: 'No suggestions found',
        }));
    } else {
      setErrorMsg &&
        setErrorMsg((prevValue) => {
          delete prevValue.school;
          return prevValue;
        });
    }
  }, [filterSchools.length, school, localSchool, setErrorMsg]);

  function handleDropdownClick(event: MouseEvent) {
    event.stopPropagation();
    setShowSchoolsList(true);
  }

  function handleInputChange(event: ChangeEvent) {
    const typedValue = (event.target as HTMLInputElement).value;
    dispatch({ type: SET_SCHOOL, payload: '' });

    if (typedValue) {
      setShowSchoolsList(true);
    } else {
      setShowSchoolsList(false);
    }

    setLocalSchool(typedValue);
  }

  function handleUpArrowClick(event: MouseEvent) {
    if (showSchoolsList) {
      event.stopPropagation();
      setShowSchoolsList(false);
    }
  }

  function handleCrossBtnClick(event: MouseEvent) {
    event.stopPropagation();
    setLocalSchool('');
    setShowSchoolsList(false);
    dispatch({ type: SET_SCHOOL, payload: '' });
    inputTextRef.current?.focus();
  }

  function handleDropdownOptionClick(_school: string) {
    setLocalSchool(_school);
    setOptionClicked(true);

    setTimeout(function () {
      setErrorMsg &&
        setErrorMsg((prevValue) => {
          delete prevValue.school;
          return prevValue;
        });

      setOptionClicked(false);
      dispatch({ type: SET_SCHOOL, payload: _school });
      setShowSchoolsList(false);
      setTimeout(() => handleOkClick(), 600);
    }, 500);
  }

  return (
    <div
      className={styles['dropdown-select__schools']}
      onClick={handleDropdownClick}
    >
      <QuestionInputText
        className={styles['dropdown-select__input']}
        placeholder="Ingresa el nombre del colegio"
        value={localSchool}
        onChange={handleInputChange}
        ref={inputTextRef}
      />

      <button
        className={classNames(styles['dropdown-select__btn'], {
          [styles['close']]: !showSchoolsList && !localSchool,
        })}
        onClick={localSchool ? handleCrossBtnClick : handleUpArrowClick}
      >
        <Image
          src={localSchool ? '/close.svg' : '/navigate-next.svg'}
          alt="dropdown arrow"
          width={26}
          height={26}
        />
      </button>

      <DropdownSelect
        showUpIndicator={false}
        className={classNames(styles['dropdown-select__options'], {
          [styles['show']]: showSchoolsList && filterSchools.length,
        })}
      >
        {filterSchools.map(function (_school) {
          return (
            <DropdownSelectOption
              key={_school}
              onClick={() => handleDropdownOptionClick(_school)}
              isSelected={localSchool === _school && optionClicked}
            >
              {_school}
            </DropdownSelectOption>
          );
        })}
      </DropdownSelect>
    </div>
  );
}
