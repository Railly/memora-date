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

interface IContactSettingsProps {
  control: Control<CreateEventSchema>;
}
export const ContactSettings: React.FC<IContactSettingsProps> = ({
  control,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-[#B4B4B4] text-sm">Contact Settings</p>
      <div className="flex items-center w-full gap-5">
        <FormField
          control={control}
          name="contact"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full h-full transition duration-200 ease-in-out">
              <FormLabel>Select an existing contact</FormLabel>
              <FormControl className="flex gap-4">
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a contact"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <p className="flex w-full mt-5">or insert it manually below</p>
      </div>
    </div>
  );
};
