"use client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { FieldError } from "react-hook-form";

interface IDatePickerProps {
  selected?: Date;
  onChange: (date: Date | undefined) => void;
  error?: FieldError;
  disabled?: boolean;
}

export const DatePicker: React.FC<IDatePickerProps> = ({
  selected,
  onChange,
  error,
  disabled,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={error ? "input-error" : "input-default"}
          disabled={disabled}
          className={cn(
            "w-full inline-flex justify-start text-left font-normal",
            "hover:border-memora-blue",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => onChange(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
