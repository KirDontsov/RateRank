import type { ReactNode } from 'react';

export interface CommonProps {
  children?: ReactNode | ReactNode[];
}

export const enum ErrorTypes {
  Required = 'required',
  MaxLength = 'maxLength',
  MinLength = 'minLength',
  Pattern = 'pattern',
  Validate = 'validate',
}
