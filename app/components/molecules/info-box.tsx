import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '~/utils';

type InfoBoxProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;
type InfoBoxRef = ElementRef<typeof PopoverPrimitive.Content>;

const InfoBox = forwardRef<InfoBoxRef, InfoBoxProps>(
  ({ className, children, sideOffset = 2, ...props }, ref) => {
    return (
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <InformationCircleIcon className="h-5" />
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          className={cn(
            'rounded-md bg-subtle text-accent-foreground shadow-md outline-none ring-2 ring-ring animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        >
          <PopoverPrimitive.Arrow className="h-2 w-4 fill-ring" />
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    );
  }
);
InfoBox.displayName = 'InfoBox';

export { InfoBox };
