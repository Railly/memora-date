import { CreateEventSchema } from "@/schemas/event.schema";
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
import { EventType } from "@/types/entities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Visibility } from "./visibility";

interface IBasicInformationProps {
  eventTypes: EventType[];
  control: Control<CreateEventSchema>;
  errors: FieldErrors<CreateEventSchema>;
}
export const BasicInformation: React.FC<IBasicInformationProps> = ({
  eventTypes,
  control,
  errors,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-[#B4B4B4] text-sm">Basic information</p>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 place-items-center place-content-center">
          <FormField
            control={control}
            name="event.name"
            render={({ field }) => (
              <FormItem className="relative flex flex-col w-full">
                <FormLabel htmlFor="event.name">Name</FormLabel>
                <FormControl>
                  <Input
                    id="event.name"
                    type="text"
                    placeholder="An Incredible Event"
                    withIcon={<IconSpeakerphone size={20} />}
                    variant={errors.event?.name ? "error" : "default"}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormErrorMessage name="event.name" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="event_type.type"
            render={({ field }) => (
              <FormItem className="relative flex flex-col w-full">
                <FormLabel htmlFor="event_type.type">Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={eventTypes.length === 0}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      variant={errors.event_type?.type ? "error" : "default"}
                      className="w-[180px]"
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((eventType) => (
                        <SelectItem key={eventType.id} value={eventType.id}>
                          {eventType.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormErrorMessage name="event_type.type" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={control}
          name="event.description"
          render={({ field }) => (
            <FormItem className="relative flex flex-col">
              <FormLabel htmlFor="event.description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="event.description"
                  placeholder="Your detailed description"
                  variant={errors.event?.description ? "error" : "default"}
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormErrorMessage name="event.description" />
            </FormItem>
          )}
        />
        <div className="flex w-full gap-4">
          <FormField
            control={control}
            name="event.date"
            render={({ field }) => (
              <FormItem className="relative flex flex-col justify-center w-1/2">
                <FormLabel htmlFor="event.date">Date</FormLabel>
                <FormControl>
                  <DatePicker
                    selected={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => field.onChange(date)}
                    error={errors.event?.date}
                  />
                </FormControl>
                <FormErrorMessage name="event.date" />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="event.is_public"
            render={({ field }) => (
              <FormItem className="relative flex flex-col justify-center w-1/2">
                <FormLabel htmlFor="event.visibility">Visibility</FormLabel>
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
