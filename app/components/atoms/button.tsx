import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'cva';
import { cn } from '~/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'rounded-md',
        toolbar: 'bg-primary rounded-lg hover:bg-primary-hover focus:bg-primary-active',
      },
      size: {
        default: 'px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [{ variant: 'toolbar', size: 'default', class: 'px-2' }],
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button };

/* import type { ComponentPropsWithRef, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type ButtonProps = ComponentPropsWithRef<'button'> & {
  children?: ReactNode;
  color: 'primary' | 'neutral';
};

function ButtonComponent(
  { children, className, color, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      ref={ref}
      className={twMerge(
        clsx(
          ' focus:outline-none focus:ring-4',
          color === 'primary'
            ? 'dark:text-violetDark12 dark:hover:bg-violetDark5 dark:focus:bg-violetDark6 text-violet12 hover:bg-violet5 focus:bg-violet6 bg-primary focus:ring-ring'
            : 'dark:bg-mauveDark4 dark:text-mauveDark12 dark:hover:bg-mauveDark5 dark:focus:bg-mauveDark6 dark:focus:ring-mauveDark7 bg-mauve4 text-mauve12 hover:bg-mauve5 focus:bg-mauve6 focus:ring-mauve7'
        ),
        className
      )}
    >
      {children}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(ButtonComponent);
Button.displayName = 'Button';

*/
/*import { cva, type VariantProps } from 'cva';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '~/utils';

// Styled variants:
// - default

const buttonVariants = cva(
  '  text-sm  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
*/
