import { useQuestions, useSharedStates } from '@/contexts';
import {
  BtnContainer,
  DropdownSelect,
  DropdownSelectOption,
  Error,
  QuestionNumHeading,
  QuestionBoxPara,
} from '../index';
import classNames from 'classnames';
import Image from 'next/image';
import { ZONES } from '@/constants';
import { REMOVE_ZONE, SET_ZONES } from '@/reducers';
import styles from './ZoneInput.module.css';

export function ZoneInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.zones ?? '';
  const { zones } = state;

  function handleDropdownOptionClick(_zone: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.zones;
        return prevValue;
      });

    if (zones.includes(_zone)) {
      dispatch({ type: REMOVE_ZONE, payload: _zone });
    } else {
      dispatch({ type: SET_ZONES, payload: _zone });
    }
  }

  return (
    <>
      <QuestionNumHeading questionNum={8}>
        ¿En qué zonas puedes dar clases presenciales?
      </QuestionNumHeading>
      <QuestionBoxPara>
        Deja este campo vacio si sólo puedes dar clases virtuales
      </QuestionBoxPara>

      <DropdownSelect className={classNames(styles['dropdown-with-image'])}>
        <div className={styles['dropdown-content']}>
          <div className={styles['options-container']}>
            {Object.keys(ZONES).map((zoneKey) => {
              const _zone = ZONES[zoneKey];
              const isSelected = zones.includes(_zone);

              return (
                <DropdownSelectOption
                  key={zoneKey}
                  className={classNames(styles['first-option'])}
                  onClick={() => handleDropdownOptionClick(_zone)}
                  isSelected={isSelected}
                >
                  <span
                    className={classNames({
                      [styles['selected']]: isSelected,
                    })}
                  >
                    {zoneKey}
                  </span>
                  <span className={styles['first']}>{_zone}</span>
                </DropdownSelectOption>
              );
            })}
          </div>
          <div className={styles['image-container']}>
            <Image
              src="/mapa.jpeg"
              alt="Your description"
              className={styles['zone-image']}
              layout="responsive"
              width={250}
              height={250}
            />
          </div>
        </div>
      </DropdownSelect>

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === '' && (
        <BtnContainer
          className={classNames(styles['btn-container'], styles['ok'])}
          showPressEnter={false}
          onClick={handleOkClick}
        >
          OK{' '}
          <Image
            src="/check-small.svg"
            alt="check small"
            width={34}
            height={34}
          />
        </BtnContainer>
      )}
    </>
  );
}
