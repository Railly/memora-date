import { CreateEventSchema } from "@/schemas/event.schema";
import { IconCircleNumber1, IconRepeat } from "@tabler/icons-react";
import { Control } from "react-hook-form";
import {
  FormControl,
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

interface IReminderSettingsProps {
  control: Control<CreateEventSchema>;
}
export const ReminderSettings: React.FC<IReminderSettingsProps> = ({
  control,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-[#B4B4B4] text-sm">Reminder Settings</p>
      <div className="flex flex-col w-full gap-5">
        <FormField
          control={control}
          name="reminder.reminder_type"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
              <FormLabel>Reminder type</FormLabel>
              <FormControl className="flex gap-4">
                <RadioGroup value={field.value} onValueChange={field.onChange}>
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
              <FormLabel>Interval</FormLabel>
              <FormControl className="flex gap-4">
                <RadioGroup value={field.value} onValueChange={field.onChange}>
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
            <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
              <FormLabel>End Date</FormLabel>
              <FormControl className="flex gap-4">
                <DatePicker />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="reminder.day_of_week"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
              <FormLabel>Day of Week</FormLabel>
              <FormControl className="flex gap-4">
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a day of week">
                      {DAYS_OF_WEEK[Number(field.value)]}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS_OF_WEEK.map((day, index) => (
                      <SelectItem
                        key={day}
                        value={String(index)}
                        className="flex items-center gap-2"
                      >
                        <span>{day}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
