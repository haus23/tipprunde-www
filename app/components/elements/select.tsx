import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import * as SelectPrimitive from '@radix-ui/react-select';

type TOptions = { id: string } & Record<string, any>;

type SelectProps<T extends TOptions> = {
  value: string;
  onValueChanged: (value: string) => void;
  options: T[];
  display: (item: T) => string;
};

export function Select<T extends TOptions>({
  options,
  display,
  value,
  onValueChanged,
}: SelectProps<T>) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChanged}>
      <SelectPrimitive.Trigger className="isolate z-10 inline-flex grow basis-1/2 translate-y-[1px] items-center justify-between rounded border-2 border-primary-line bg-primary p-1 pl-2 font-semibold shadow ring-offset-background hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:grow-0 lg:basis-1/3">
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="h-5 w-5 text-foreground" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          align="end"
          sideOffset={8}
          className="isolate z-10 max-h-[var(--radix-select-content-available-height)] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md bg-subtle p-2 shadow-lg ring-1 ring-ring focus:outline-none"
        >
          <SelectPrimitive.ScrollUpButton className="flex justify-center">
            <ChevronUpIcon className="h-5" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport>
            {options.map((item) => (
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
            ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex justify-center">
            <ChevronDownIcon className="h-5" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
