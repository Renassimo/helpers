import { FormEvent, ReactNode } from 'react';
import { Breakpoint } from '@mui/material';

const MockedModal = jest.fn(
  ({
    open,
    children,
    onClose,
    onSubmit,
    title,
    loading,
    disabled,
    maxWidth = 'sm',
  }: {
    open: boolean;
    children: ReactNode;
    onClose: () => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    title: string;
    loading: boolean;
    disabled?: boolean;
    maxWidth?: Breakpoint;
  }) => (
    <div>
      {children}
      <div>
        title: {title}; maxWidth: {maxWidth};{open ? 'open' : 'closed'};
        {loading ? 'loading' : 'not loading'};
        {disabled ? 'disabled' : 'not disabled'}; onClose{' '}
        {!!onClose ? 'passed' : 'did not passed'}; onSubmit{' '}
        {!!onSubmit ? 'passed' : 'did not passed'};
      </div>
    </div>
  )
);

export default MockedModal;
