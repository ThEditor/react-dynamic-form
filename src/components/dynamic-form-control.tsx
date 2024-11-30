import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { FormControl } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { ControllerRenderProps } from "react-hook-form";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Field } from "@/types";

interface Props {
  inputField: Field;
  field: ControllerRenderProps<object, never>;
}

export default function DynamicFormControl({ inputField, field }: Props) {
  if (inputField.type === "select")
    return <SelectInput inputField={inputField} field={field} />;

  if (inputField.type === "textarea")
    return (
      <FormControl>
        <Textarea {...field} />
      </FormControl>
    );

  if (inputField.type === "checkbox")
    return (
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
    );

  if (inputField.type === "date")
    return (
      <FormControl>
        <DateInput inputField={inputField} field={field} />
      </FormControl>
    );

  return (
    <FormControl>
      <Input type={inputField.type} {...field} />
    </FormControl>
  );
}

export function DateInput({ field }: Props) {
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

export function SelectInput({ inputField, field }: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {inputField.options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
