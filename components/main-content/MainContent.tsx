import { useSharedStates } from '@/contexts';
import { useHandleKeypress, useHandleScroll } from '@/hooks';
import { useEffect } from 'react';
import { Question } from '../index';

export function MainContent() {
  const { questionNum, setShowSchoolsList } = useSharedStates();
  const { prev, now } = questionNum;

  useHandleKeypress();
  useHandleScroll();

  useEffect(() => {
    function handleClick() {
      setShowSchoolsList(false);
    }

    document.addEventListener('click', handleClick);

    return function () {
      document.removeEventListener('click', handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div>
        <Question
          type="intro"
          outView={now - 1 === 0 || now > 1}
          outViewSlide="up"
          inView={now === 0}
          inViewSlide={prev === 1 ? 'down' : ''}
          isRendered={prev === null}
        />

        {[0, 2].includes(prev ?? -1) && [now - 1, now, now + 1].includes(1) && (
          <Question
            type="name"
            outView={[now - 1, now + 1].includes(1)}
            outViewSlide={now - 1 === 1 ? 'up' : 'down'}
            inView={now === 1}
            inViewSlide={prev === 2 ? 'down' : 'up'}
          />
        )}

        {[1, 3].includes(prev ?? 0) && [now - 1, now, now + 1].includes(2) && (
          <Question
            type="school"
            outView={[now - 1, now + 1].includes(2)}
            outViewSlide={now - 1 === 2 ? 'up' : 'down'}
            inView={now === 2}
            inViewSlide={prev === 3 ? 'down' : 'up'}
          />
        )}

        {[2, 4].includes(prev ?? 0) && [now - 1, now, now + 1].includes(3) && (
          <Question
            type="email"
            outView={[now - 1, now + 1].includes(3)}
            outViewSlide={now - 1 === 3 ? 'up' : 'down'}
            inView={now === 3}
            inViewSlide={prev === 4 ? 'down' : 'up'}
          />
        )}

        {[3, 5].includes(prev ?? 0) && [now - 1, now, now + 1].includes(4) && (
          <Question
            type="phone"
            outView={[now - 1, now + 1].includes(4)}
            outViewSlide={now - 1 === 4 ? 'up' : 'down'}
            inView={now === 4}
            inViewSlide={prev === 5 ? 'down' : 'up'}
          />
        )}

        {[4, 6].includes(prev ?? 0) && [now - 1, now, now + 1].includes(5) && (
          <Question
            type="identification"
            outView={[now - 1, now + 1].includes(5)}
            outViewSlide={now - 1 === 5 ? 'up' : 'down'}
            inView={now === 5}
            inViewSlide={prev === 6 ? 'down' : 'up'}
          />
        )}

        {[5, 7].includes(prev ?? 0) && [now - 1, now, now + 1].includes(6) && (
          <Question
            type="basic"
            outView={[now - 1, now + 1].includes(6)}
            outViewSlide={now - 1 === 6 ? 'up' : 'down'}
            inView={now === 6}
            inViewSlide={prev === 7 ? 'down' : 'up'}
          />
        )}

        {[6, 8].includes(prev ?? 0) && [now - 1, now, now + 1].includes(7) && (
          <Question
            type="intermediate"
            outView={[now - 1, now + 1].includes(7)}
            outViewSlide={now - 1 === 7 ? 'up' : 'down'}
            inView={now === 7}
            inViewSlide={prev === 8 ? 'down' : 'up'}
          />
        )}

        {[7, 9].includes(prev ?? 0) && [now - 1, now, now + 1].includes(8) && (
          <Question
            type="advanced"
            outView={[now - 1, now + 1].includes(8)}
            outViewSlide={now - 1 === 8 ? 'up' : 'down'}
            inView={now === 8}
            inViewSlide={prev === 9 ? 'down' : 'up'}
          />
        )}

        {[8, 10].includes(prev ?? 0) && [now - 1, now, now + 1].includes(9) && (
          <Question
            type="zone"
            outView={[now - 1, now + 1].includes(9)}
            outViewSlide={now - 1 === 9 ? 'up' : 'down'}
            inView={now === 9}
            inViewSlide={prev === 10 ? 'down' : 'up'}
          />
        )}

        {prev === 9 && [now - 1, now, now + 1].includes(10) && (
          <Question
            type="outro"
            outView={[now - 1, now + 1].includes(10)}
            outViewSlide={now - 1 === 10 ? 'up' : 'down'}
            inView={now === 10}
            inViewSlide={'up'}
          />
        )}
      </div>
    </section>
  );
}
