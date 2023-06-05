import { useEffect, useState, type ReactElement, Fragment } from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import * as SelectPrimitive from '@radix-ui/react-select';

type TOptions = { id: string } & Record<string, any>;
type ExtractStringValueKeys<T> = { [I in keyof T]: T[I] extends string ? I : never }[Extract<
  keyof T,
  string
>];

type SelectProps<T extends TOptions, G extends TOptions> = {
  value: string;
  onValueChanged: (value: string) => void;
  options: T[];
  display: (item: T) => string;
  groups?: G[];
  groupKey?: ExtractStringValueKeys<T>;
  groupDisplay?: (group: G) => string;
};

function SelectOverlay({ open }: { open: boolean }) {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
    setVisible(true);
    return () => {};
  }, [open]);

  return visible ? (
    <div className="fixed inset-0" onClick={(e) => e.stopPropagation()}></div>
  ) : null;
}

export function Select<T extends TOptions, G extends TOptions>({
  options,
  display,
  value,
  onValueChanged,
  groups,
  groupKey,
  groupDisplay,
}: SelectProps<T, G>) {
  // Removable when issue is solved
  const [open, setOpen] = useState(false);

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChanged}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectPrimitive.Trigger className="isolate z-10 inline-flex grow basis-1/2 translate-y-[1px] items-center justify-between rounded border-2 border-primary-line bg-primary p-1 pl-2 font-semibold shadow ring-offset-background hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:grow-0 lg:basis-1/3">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="h-5 w-5 text-foreground" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <>
          {/* Workaround for https://github.com/radix-ui/primitives/issues/1658 */}
          <SelectOverlay open={open} />
          <SelectPrimitive.Content
            position="popper"
            align="end"
            sideOffset={8}
            className="isolate z-10 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-popper-available-width)] overflow-hidden rounded-md bg-subtle p-2 shadow-lg ring-1 ring-ring focus:outline-none  sm:min-w-[var(--radix-select-trigger-width)]"
          >
            <SelectPrimitive.ScrollUpButton className="flex justify-center">
              <ChevronUpIcon className="h-5" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport>
              {(groups || [undefined]).map((g) => {
                let GroupContainer: ReactElement;
                const children = options
                  .filter((item) => (groupKey ? item[groupKey] === g?.id : true))
                  .map((item) => (
                    <SelectPrimitive.Item
                      key={item.id}
                      value={item.id}
                      className="relative my-1 flex cursor-pointer select-none items-center justify-between space-x-2 rounded px-4 py-1 focus:bg-neutral-hover focus:outline-none data-[state=checked]:text-accent-subtle-foreground"
                    >
                      <SelectPrimitive.ItemText>{display(item)}</SelectPrimitive.ItemText>
                      <SelectPrimitive.ItemIndicator className="absolute right-4">
                        <CheckIcon className="h-6" />
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                  ));
                if (g) {
                  GroupContainer = (
                    <SelectPrimitive.Group key={g.id}>
                      <SelectPrimitive.Label className="text-sm text-subtle-foreground">
                        {groupDisplay && groupDisplay(g)}
                      </SelectPrimitive.Label>
                      {...children}
                    </SelectPrimitive.Group>
                  );
                } else {
                  GroupContainer = <Fragment key={'no-group'}>{...children}</Fragment>;
                }
                return GroupContainer;
              })}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex justify-center">
              <ChevronDownIcon className="h-5" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
