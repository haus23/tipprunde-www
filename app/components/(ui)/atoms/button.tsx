import { type VariantProps, tv } from 'tailwind-variants';

const styles = tv({
  base: 'inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  variants: {
    variant: {
      default: 'rounded-md',
      toolbar: 'bg-primary rounded-lg hover:bg-primary-hover',
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
});

namespace Button {
  export interface Props
    extends React.ComponentProps<'button'>,
      VariantProps<typeof styles> {}
}

export function Button({ className, size, variant, ...props }: Button.Props) {
  return <button className={styles({ className, size, variant })} {...props} />;
}
