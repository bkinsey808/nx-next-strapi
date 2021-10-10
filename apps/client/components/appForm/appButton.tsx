import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps {
  type: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const AppButton: FC<ButtonProps> = ({ type = 'button', children }) => (
  <button
    className="
      bg-blue-500 
      hover:bg-blue-700 
      text-white 
      font-bold 
      py-2 
      px-4 
      rounded
    "
    type={type}
  >
    {children}
  </button>
);
