import { FC } from 'react';

export const ErrorText: FC = ({ children }) => (
  <div
    className="
    text-red-500 
      text-xs 
      italic
    "
  >
    {children}
  </div>
);
