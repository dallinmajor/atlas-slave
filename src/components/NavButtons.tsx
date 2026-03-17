import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const joinClasses = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(' ');

type CommonButtonProps = {
  children: ReactNode;
  className?: string;
};

type BrandButtonProps = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

export const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(
  ({ children, className, ...buttonProps }, ref) => {
    return (
      <button
        {...buttonProps}
        ref={ref}
        className={joinClasses(
          'text-base sm:text-lg md:text-xl font-black text-white tracking-tight transition-all duration-300 hover:opacity-80 uppercase cursor-pointer px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border-2 border-teal-500/50 hover:border-teal-400',
          className
        )}
        style={{ fontWeight: 900, ...buttonProps.style }}
      >
        {children}
      </button>
    );
  }
);

BrandButton.displayName = 'BrandButton';

type DesktopNavButtonProps = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    active?: boolean;
  };

export const DesktopNavButton = ({
  children,
  className,
  active = false,
  ...buttonProps
}: DesktopNavButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={joinClasses(
        'px-3 py-1 text-base font-bold uppercase tracking-wide transition-all duration-300',
        active ? 'text-teal-400' : 'text-white hover:text-teal-400',
        className
      )}
      style={{ fontWeight: 700, ...buttonProps.style }}
    >
      {children}
    </button>
  );
};

type MobileNavButtonProps = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    active?: boolean;
    showDivider?: boolean;
  };

export const MobileNavButton = ({
  children,
  className,
  active = false,
  showDivider = true,
  ...buttonProps
}: MobileNavButtonProps) => {
  return (
    <button
      {...buttonProps}
      className={joinClasses(
        'w-full text-left px-6 py-4 text-base font-bold text-white uppercase tracking-wide transition-colors',
        showDivider && 'border-b border-teal-500/20',
        active ? 'bg-teal-500/20 text-teal-400' : 'hover:bg-teal-500/10 hover:text-teal-400',
        className
      )}
      style={{ fontWeight: 700, ...buttonProps.style }}
    >
      {children}
    </button>
  );
};