import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { ControllerRenderProps } from "react-hook-form";
import { format } from "date-fns";

interface Props {
  inputType: string;
  field: ControllerRenderProps<object, never>
}

export default function DynamicFormControl({ inputType, field }: Props) {
  if (inputType === "date") return (
    <FormControl>
      <DateInput inputType={inputType} field={field} />
    </FormControl>
  );

  return (
    <FormControl>
      <Input {...field} />
    </FormControl>
  );
}

export function DateInput({
  field,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
