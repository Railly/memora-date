import { IconCircleNumber1, IconRepeat } from "@tabler/icons-react";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
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
import { DatePicker } from "@/components/ui/date-picker";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@supabase/supabase-js";
import { Checkbox } from "@/components/ui/checkbox";
import { TIME_UNIT_ARRAY } from "@/schemas/reminder.schema";

interface IReminderSettingsProps {
  control: Control<CreateEventSchema>;
  setValue: UseFormSetValue<CreateEventSchema>;
  watch: UseFormWatch<CreateEventSchema>;
  user: User | undefined;
  isEditing?: boolean;
}
export const ReminderSettings: React.FC<IReminderSettingsProps> = ({
  control,
  watch,
  setValue,
  user,
  isEditing,
}) => {
  const isRecurring = watch("reminder._.reminder_type") === "RECURRING";
  const interval = watch("reminder._.interval.unit");
  const intervalValue = watch("reminder._.interval.value");
  const recurrenceType = watch("reminder._.recurrence.type");
  const isReminderEnabled = watch("reminder.isEnabled");

  useEffect(() => {
    if (isRecurring && !isEditing) {
      setValue("reminder._.interval.unit", "Day");
      setValue("reminder._.interval.value", 1);
      setValue("reminder._.recurrence.type", "After");
      setValue("reminder._.recurrence.value", 1);
    }
  }, [isRecurring]);

  useEffect(() => {
    if (isReminderEnabled && !isEditing) {
      setValue("reminder.isEnabled", true);
      setValue("reminder._.reminder_type", "ONE_TIME");
      setValue("reminder.date", new Date());
      setValue("reminder.time", "00:00");
      setValue("reminder.notification_methods", ["EMAIL"]);
    }
  }, [isReminderEnabled]);

  return (
    <Collapsible
      open={isReminderEnabled}
      className="p-4 space-y-2 border rounded-sm bg-muted/40 border-form-stroke/20"
    >
      <div className="flex items-center justify-between w-full gap-4">
        <p className="text-foreground/80 text-md">Reminder Settings</p>
        <div className="flex items-center gap-2 space-y-0 transition duration-200 ease-in-out">
          <CollapsibleTrigger asChild>
            <FormField
              control={control}
              name="reminder.isEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      defaultChecked={false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CollapsibleTrigger>
        </div>
      </div>
      <Separator />
      <CollapsibleContent className="space-y-5">
        <div className="flex w-full gap-5 mt-3">
          <FormField
            control={control}
            name="reminder.date"
            render={({ field }) => (
              <FormItem className="relative flex flex-col justify-center w-1/2">
                <FormLabel htmlFor={field.name}>Date</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date)}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="reminder.time"
            render={({ field, fieldState }) => (
              <FormItem className="relative flex flex-col justify-center w-1/2">
                <FormLabel htmlFor={field.name}>Time</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    className=" dark:[color-scheme:dark]"
                    value={field.value}
                    onChange={field.onChange}
                    variant={fieldState.error ? "error" : "default"}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col w-full gap-5 mt-3">
          <FormField
            control={control}
            name="reminder._.reminder_type"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                <FormLabel htmlFor={field.name}>Reminder type</FormLabel>
                <FormControl className="flex gap-4">
                  <Tabs
                    id={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    className="w-full flex flex-col gap-0"
                  >
                    <TabsList className="w-full">
                      <TabsTrigger
                        className="w-full space-x-2 data-[state=active]:bg-foreground/20"
                        value="ONE_TIME"
                        type="button"
                      >
                        <IconCircleNumber1 size={20} />
                        <span>One Time</span>
                      </TabsTrigger>
                      <TabsTrigger
                        className="w-full space-x-2 data-[state=active]:bg-foreground/20"
                        value="RECURRING"
                      >
                        <IconRepeat size={20} />
                        <span>Recurring</span>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent
                      value="RECURRING"
                      className="flex flex-col w-full gap-6 mt-0"
                    >
                      <div className="flex flex-col gap-2 w-full mt-4">
                        <FormLabel
                          variant={isRecurring ? "default" : "disabled"}
                        >
                          Interval
                        </FormLabel>
                        <div className="grid gap-2 place-items-center grid-cols-[0.5fr,1fr,2fr]">
                          <span className="text-xs text-[#B4B4B4]">Every</span>
                          <FormField
                            control={control}
                            name="reminder._.interval.value"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                                <FormControl className="flex gap-4">
                                  <Input
                                    type="number"
                                    min={1}
                                    max={
                                      interval === "Minute"
                                        ? 360
                                        : interval === "Hour"
                                        ? 99
                                        : interval === "Day"
                                        ? 365
                                        : interval === "Week"
                                        ? 52
                                        : interval === "Month"
                                        ? 12
                                        : interval === "Year"
                                        ? 10
                                        : ""
                                    }
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={!isRecurring}
                                    defaultValue={1}
                                    placeholder="Number"
                                  />
                                </FormControl>
                                <FormErrorMessage name={field.name} />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name="reminder._.interval.unit"
                            render={({ field }) => (
                              <FormItem className="flex flex-col w-full h-full">
                                <FormControl className="flex gap-4">
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={!isRecurring}
                                  >
                                    <SelectTrigger className="w-full">
                                      <SelectValue
                                        placeholder="Unit"
                                        className="flex items-center justify-between w-full"
                                      >
                                        <span>
                                          {field.value}
                                          {field.value &&
                                          Number(intervalValue) > 1
                                            ? "s"
                                            : ""}
                                        </span>
                                      </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent placeholder="Select">
                                      {TIME_UNIT_ARRAY.map((interval) => (
                                        <SelectItem
                                          key={interval}
                                          value={interval}
                                        >
                                          {interval}
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
                      <div className="flex justify-between w-full gap-6">
                        <div className="flex flex-col gap-2 w-full">
                          <FormLabel
                            variant={isRecurring ? "default" : "disabled"}
                          >
                            Recurrence
                          </FormLabel>
                          <div className="grid gap-2 place-items-center grid-cols-[0.5fr,1fr,2fr]">
                            <span className="text-xs text-[#B4B4B4]">End</span>
                            <FormField
                              control={control}
                              name="reminder._.recurrence.type"
                              render={({ field }) => (
                                <FormItem className="flex flex-col w-full h-full">
                                  <FormControl className="flex gap-4">
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      disabled={!isRecurring}
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue
                                          placeholder="Select"
                                          className="flex items-center justify-between w-full"
                                        >
                                          <span>{field.value}</span>
                                        </SelectValue>
                                      </SelectTrigger>
                                      <SelectContent placeholder="ga">
                                        {["Until", "After"].map((type) => (
                                          <SelectItem key={type} value={type}>
                                            {type}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormErrorMessage name={field.name} />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name="reminder._.recurrence.value"
                              render={({ field }) => (
                                <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                                  <FormControl className="flex gap-4">
                                    {recurrenceType === "Until" ? (
                                      <DatePicker
                                        selected={
                                          field.value
                                            ? typeof field.value === "string"
                                              ? undefined
                                              : new Date(field.value)
                                            : undefined
                                        }
                                        onChange={(date) => {
                                          const dateValue =
                                            typeof date === "object"
                                              ? date
                                              : undefined;
                                          field.onChange(dateValue);
                                        }}
                                        disabled={!isRecurring}
                                      />
                                    ) : (
                                      <div className="grid gap-2 place-items-start items-center grid-cols-[1.5fr,2fr]">
                                        <Input
                                          type="number"
                                          min={1}
                                          max={15}
                                          value={field.value as number}
                                          onChange={field.onChange}
                                          disabled={!isRecurring}
                                          defaultValue={1}
                                          placeholder="Number"
                                        />
                                        <span className="text-xs text-[#B4B4B4] inline-flex">
                                          occurrences
                                        </span>
                                      </div>
                                    )}
                                  </FormControl>
                                  <FormErrorMessage name={field.name} />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="reminder.notification_methods"
            render={({ field }) => (
              <FormItem className="relative flex flex-col w-full gap-3">
                <FormLabel>Notify me via</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-5">
                    <div className="items-top flex space-x-2">
                      <Checkbox
                        id={`${field.name}-email`}
                        checked={field.value?.includes("EMAIL")}
                        onCheckedChange={(value) => {
                          let currentValue = Array.isArray(field.value)
                            ? field.value
                            : [];
                          if (value) {
                            if (!currentValue.includes("EMAIL")) {
                              field.onChange([...currentValue, "EMAIL"]);
                            }
                          } else {
                            field.onChange(
                              currentValue.filter((item) => item !== "EMAIL")
                            );
                          }
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel
                          htmlFor={`${field.name}-email`}
                          className="text-xs"
                        >
                          {user?.email}
                        </FormLabel>
                      </div>
                    </div>
                    <div className="items-top flex space-x-2">
                      <Checkbox
                        id={`${field.name}-phone`}
                        checked={field.value?.includes("SMS")}
                        onCheckedChange={(value) => {
                          let currentValue = Array.isArray(field.value)
                            ? field.value
                            : [];
                          if (value) {
                            if (!currentValue.includes("SMS")) {
                              field.onChange([...currentValue, "SMS"]);
                            }
                          } else {
                            field.onChange(
                              currentValue.filter((item) => item !== "SMS")
                            );
                          }
                        }}
                        disabled={!user?.phone}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel
                          htmlFor={`${field.name}-phone`}
                          variant={user?.phone ? "default" : "disabled"}
                          className="text-xs"
                        >
                          {user?.phone || "Add phone in your profile"}
                        </FormLabel>
                      </div>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
