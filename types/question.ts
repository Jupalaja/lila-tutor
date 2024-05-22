import { Dispatch, SetStateAction } from 'react';

export type QuestionProps = {
  readonly inView: boolean;
  readonly inViewSlide: 'up' | 'down' | '';
  readonly outView: boolean;
  readonly outViewSlide: 'up' | 'down' | '';
  readonly isRendered?: boolean;
  readonly type:
    | 'intro'
    | 'name'
    | 'school'
    | 'email'
    | 'phone'
    | 'identification'
    | 'basic'
    | 'intermediate'
    | 'advanced'
    | 'zone'
    | 'outro';
};

export type SchoolsProps = {
  readonly showSchoolsList: boolean;
  readonly setShowSchoolsList: Dispatch<SetStateAction<boolean>>;
};
