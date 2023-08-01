import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateEventSchema } from "@/schemas/event.schema";
import {
  IconCircleNumber1,
  IconRepeat,
  IconSpeakerphone,
} from "@tabler/icons-react";
import { Control } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
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

interface INotificationSettingsProps {
  control: Control<CreateEventSchema>;
}
export const NotificationSettings: React.FC<INotificationSettingsProps> = ({
  control,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-[#B4B4B4] text-sm">Notification Settings</p>
      <div className="flex flex-col w-full gap-5">
        <div className="flex justify-between w-full gap-6">
          <div className="relative flex flex-col w-9/12 gap-2">
            <Label htmlFor="event.email">Your email</Label>
            <Input
              id="event.email"
              type="text"
              placeholder="Your email"
              withIcon={<IconSpeakerphone size={20} />}
              disabled
            />
          </div>
          <div className="relative flex flex-col w-3/12 gap-2">
            <FormField
              control={control}
              name="reminder.is_email_enabled"
              render={({ field }) => (
                <FormItem className="flex flex-col w-3/12 h-full p-2 transition duration-200 ease-in-out">
                  <FormLabel>Enabled?</FormLabel>
                  <FormControl>
                    <Switch
                      className="mr-4"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between w-full gap-6">
          <div className="relative flex flex-col w-9/12 gap-2">
            <Label htmlFor="event.phone">Your phone</Label>
            <Input
              id="event.phone"
              type="text"
              placeholder="Your phone"
              withIcon={<IconSpeakerphone size={20} />}
              disabled
            />
          </div>
          <FormField
            control={control}
            name="reminder.is_sms_enabled"
            render={({ field }) => (
              <FormItem className="flex flex-col w-3/12 h-full p-2 transition duration-200 ease-in-out">
                <FormLabel>Enabled?</FormLabel>
                <FormControl>
                  <Switch
                    className="mr-4"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between w-full gap-6">
          <div className="relative flex flex-col w-9/12 gap-2">
            <Label htmlFor="reminder.notify_before_number">Notify me</Label>
            <div className="flex items-center gap-4">
              <FormField
                control={control}
                name="reminder.notify_before_number"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Notify me"
                        withIcon={<IconSpeakerphone size={20} />}
                        value={field.value}
                        onChange={field.onChange}
                        min={1}
                        max={60}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="reminder.notify_before_time_unit"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue>
                            {field.value || "Select a time unit"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <p className="flex w-full">before the event</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
