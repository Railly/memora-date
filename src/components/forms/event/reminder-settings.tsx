import { IconCircleNumber1, IconRepeat } from "@tabler/icons-react";
import { Control, FieldErrors } from "react-hook-form";
import {
  FormControl,
  FormErrorMessage,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";
import { DAYS_OF_WEEK } from "./constants";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { Separator } from "@/components/ui/separator";

interface IReminderSettingsProps {
  control: Control<CreateEventSchema>;
  errors: FieldErrors<CreateEventSchema>;
  isRecurring: boolean;
  isWeekly: boolean;
}
export const ReminderSettings: React.FC<IReminderSettingsProps> = ({
  control,
  errors,
  isRecurring,
  isWeekly,
}) => {
  return (
    <div className="p-4 space-y-2 border rounded-sm border-opacity-20 bg-muted/40 border-input-border">
      <p className="text-[#B4B4B4] text-md">Reminder Settings</p>
      <Separator />
      <div className="space-y-5">
        <div className="flex flex-col w-full gap-5">
          <FormField
            control={control}
            name="reminder.reminder_type"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                <FormLabel htmlFor={field.name}>Reminder type</FormLabel>
                <FormControl className="flex gap-4">
                  <RadioGroup
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {["One Time", "Recurring"].map((type) => (
                      <RadioGroupItem
                        key={type}
                        className="space-x-2"
                        value={type.split(" ").join("_").toUpperCase()}
                        id={type}
                      >
                        {type === "One Time" ? (
                          <IconCircleNumber1 size={20} />
                        ) : (
                          <IconRepeat size={20} />
                        )}
                        <span>{type}</span>
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between w-full gap-6">
          <FormField
            control={control}
            name="reminder.interval"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                <FormLabel
                  htmlFor={field.name}
                  variant={isRecurring ? "default" : "disabled"}
                >
                  Interval
                </FormLabel>
                <FormControl className="flex gap-4">
                  <RadioGroup
                    id={field.name}
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!isRecurring}
                  >
                    {["Daily", "Weekly", "Monthly", "Annually"].map(
                      (interval) => (
                        <RadioGroupItem
                          key={interval}
                          className="space-x-2"
                          value={interval.toUpperCase()}
                          id={interval}
                        >
                          <span>{interval}</span>
                        </RadioGroupItem>
                      )
                    )}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-5">
          <FormField
            control={control}
            name="reminder.end_date"
            render={({ field }) => (
              <FormItem className="relative flex flex-col w-full h-full transition duration-200 ease-in-out">
                <FormLabel
                  htmlFor={field.name}
                  variant={isRecurring ? "default" : "disabled"}
                >
                  End Date
                </FormLabel>
                <FormControl className="flex gap-5">
                  <DatePicker
                    selected={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date)}
                    error={errors.reminder?.end_date}
                    disabled={!isRecurring}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="reminder.day_of_week"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                <FormLabel
                  htmlFor={field.name}
                  variant={isRecurring && isWeekly ? "default" : "disabled"}
                >
                  Day of Week
                </FormLabel>
                <FormControl className="flex gap-4">
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger
                      id={field.name}
                      name={field.name}
                      disabled={!isRecurring || !isWeekly}
                      variant={
                        errors.reminder?.day_of_week ? "error" : "default"
                      }
                    >
                      <SelectValue placeholder="Select a day"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {DAYS_OF_WEEK.map((day) => (
                        <SelectItem
                          key={day}
                          value={day.toUpperCase()}
                          className="flex items-center gap-2"
                        >
                          <span>{day}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
