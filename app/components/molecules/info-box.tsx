import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  useState,
  useRef,
} from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useHover } from '@react-aria/interactions';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { cn } from '~/utils';

type InfoBoxProps = ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;
type InfoBoxRef = ElementRef<typeof PopoverPrimitive.Content>;

const InfoBox = forwardRef<InfoBoxRef, InfoBoxProps>(
  ({ className, children, sideOffset = 2, ...props }, ref) => {
    const [isOpen, setOpen] = useState(false);
    const debounceRef = useRef(false);

    const { hoverProps } = useHover({
      onHoverChange(isHovering) {
        if (isHovering) {
          debounceRef.current = true;
          setOpen(true);
          setTimeout(() => {
            debounceRef.current = false;
          }, 50);
        } else {
          if (!debounceRef.current) setOpen(false);
        }
      },
    });

    return (
      <PopoverPrimitive.Root open={isOpen} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          {...hoverProps}
          className="rounded focus:outline-none focus-visible:outline focus-visible:outline-ring"
        >
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
          {...hoverProps}
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
