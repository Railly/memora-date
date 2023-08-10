import { IconSpeakerphone } from "@tabler/icons-react";
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
import { EventType } from "@/lib/entities.types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Visibility } from "./visibility";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { Separator } from "@/components/ui/separator";

interface IBasicInformationProps {
  eventTypes: EventType[] | null;
  control: Control<CreateEventSchema>;
  errors: FieldErrors<CreateEventSchema>;
}
export const BasicInformation: React.FC<IBasicInformationProps> = ({
  eventTypes,
  control,
  errors,
}) => {
  return (
    <div className="p-4 space-y-2 border rounded-sm border-opacity-20 bg-muted/40 border-input-border">
      <p className="text-[#B4B4B4] text-md">Basic information</p>
      <Separator />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 mt-1 place-items-center place-content-center">
          <FormField
            control={control}
            name="event.name"
            render={({ field }) => (
              <FormItem className="relative flex flex-col w-full">
                <FormLabel htmlFor={field.name}>Name</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="An Incredible Event"
                    leftIcon={<IconSpeakerphone size={20} />}
                    variant={errors.event?.name ? "error" : "default"}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="event_type.type"
            render={({ field }) => (
              <FormItem className="relative flex flex-col w-full">
                <FormLabel htmlFor={field.name}>Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={eventTypes?.length === 0}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={field.name}
                      name={field.name}
                      variant={errors.event_type?.type ? "error" : "default"}
                      className="w-[180px]"
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes &&
                        eventTypes.map((eventType) => (
                          <SelectItem key={eventType.id} value={eventType.id}>
                            {eventType.value}
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
        <FormField
          control={control}
          name="event.description"
          render={({ field }) => (
            <FormItem className="relative flex flex-col">
              <FormLabel htmlFor={field.name}>Description</FormLabel>
              <FormControl>
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Your detailed description"
                  variant={errors.event?.description ? "error" : "default"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormErrorMessage name={field.name} />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          <FormField
            control={control}
            name="event.date"
            render={({ field }) => (
              <FormItem className="relative flex flex-col justify-center w-1/2">
                <FormLabel htmlFor={field.name}>Date</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date)}
                    error={errors.event?.date}
                  />
                </FormControl>
                <FormErrorMessage name={field.name} />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="event.is_public"
            render={({ field }) => (
              <FormItem className="relative flex flex-col justify-center w-1/2">
                <FormLabel htmlFor={field.name}>Visibility</FormLabel>
                <FormControl>
                  <Visibility
                    isPublic={field.value}
                    onChange={(visibility) => field.onChange(visibility)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
