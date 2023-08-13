import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconSpeakerphone } from "@tabler/icons-react";
import { Control, FieldErrors } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
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
import { TIME_UNITS } from "./constants";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { User } from "@supabase/supabase-js";
import { Separator } from "@/components/ui/separator";

interface INotificationSettingsProps {
  control: Control<CreateEventSchema>;
  errors: FieldErrors<CreateEventSchema>;
  user?: User;
}
export const NotificationSettings: React.FC<INotificationSettingsProps> = ({
  control,
  errors,
  user,
}) => {
  return (
    <div className="p-4 space-y-2 border rounded-sm bg-muted/40 border-form-stroke/20">
      <div className="flex items-center w-full gap-4">
        <p className="text-[#B4B4B4] text-md">Notification Settings</p>
        <FormErrorMessage
          className="static w1/2"
          name="reminder.notification_methods"
        />
      </div>
      <Separator />
      <div className="space-y-5">
        <div className="flex flex-col w-full gap-5 mt-3">
          <div className="flex items-center w-full gap-6">
            <div className="relative flex flex-col w-6/12 gap-2">
              <Label htmlFor="event.email">Your email</Label>
              <Input
                id="event.email"
                name="event.email"
                type="text"
                placeholder="Your email"
                value={user?.email}
                leftIcon={<IconSpeakerphone size={20} />}
                disabled
              />
            </div>
            <div className="relative flex flex-col w-3/12 gap-2">
              <FormField
                control={control}
                name="reminder.notification_methods"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 p-2 mt-4 space-y-0 transition duration-200 ease-in-out">
                    <FormLabel
                      htmlFor={field.name}
                      variant={
                        errors.reminder?.notification_methods
                          ? "error"
                          : field.value?.includes("EMAIL")
                          ? "default"
                          : "disabled"
                      }
                    >
                      Enabled?
                    </FormLabel>
                    <FormControl>
                      <Switch
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
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full gap-6">
            <div className="relative flex flex-col w-6/12 gap-2">
              <Label htmlFor="event.phone">Your phone</Label>
              <Input
                id="event.phone"
                name="event.phone"
                type="text"
                value={user?.user_metadata?.phone}
                placeholder="Your phone"
                leftIcon={<IconSpeakerphone size={20} />}
                disabled
              />
            </div>
            <FormField
              control={control}
              name="reminder.notification_methods"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 p-2 mt-4 space-y-0 transition duration-200 ease-in-out">
                  <FormLabel
                    htmlFor={field.name}
                    variant={
                      errors.reminder?.notification_methods
                        ? "error"
                        : user?.user_metadata?.phone
                        ? "default"
                        : "disabled"
                    }
                  >
                    Enabled?
                  </FormLabel>
                  <FormControl>
                    <Switch
                      disabled={!user?.user_metadata?.phone}
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between w-full gap-6">
            <div className="relative flex flex-col w-full gap-2">
              <Label htmlFor="reminder.notify_before_number">Notify me</Label>
              <div className="flex items-center w-full gap-4">
                <FormField
                  control={control}
                  name="reminder.notify_before_number"
                  render={({ field }) => (
                    <FormItem className="relative flex flex-col w-full h-full transition duration-200 ease-in-out">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Notify me"
                          leftIcon={<IconSpeakerphone size={20} />}
                          variant={
                            errors.reminder?.notify_before_number
                              ? "error"
                              : "default"
                          }
                          value={field.value}
                          onChange={field.onChange}
                          min={0}
                        />
                      </FormControl>
                      <FormErrorMessage name="reminder.notify_before_number" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="reminder.notify_before_time_unit"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              id={field.name}
                              name={field.name}
                              variant={
                                errors.reminder?.notify_before_time_unit
                                  ? "error"
                                  : "default"
                              }
                            >
                              <SelectValue placeholder="Select a unit"></SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {TIME_UNITS.map((unit) => (
                                <SelectItem
                                  key={unit}
                                  value={unit.toUpperCase()}
                                >
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormErrorMessage name={field.name} />
                      </FormItem>
                    );
                  }}
                />
                <p className="flex w-1/2 text-xs">before the event</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
