import { IconSpeakerphone } from "@tabler/icons-react";
import { Control } from "react-hook-form";
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
import { Visibility } from "./visibility";
import { CreateEventSchema } from "@/schemas/create-event.schema";
import { Separator } from "@/components/ui/separator";
import { InfoTooltip } from "@/components/shared/atoms/info-tooltip";
import { Badge } from "@/components/ui/badge";
import { eventTypeUtils } from "@/components/icons/event-type";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IBasicInformationProps {
  eventTypes: EventType[] | null;
  control: Control<CreateEventSchema>;
}
export const BasicInformation: React.FC<IBasicInformationProps> = ({
  eventTypes,
  control,
}) => {
  const [eventTypeClassName, setEventTypeClassName] = useState<string>("");
  return (
    <div className="p-4 space-y-2 border rounded-sm border-form-stroke/20 bg-muted/40">
      <p className="text-[#B4B4B4] text-md">Basic information</p>
      <Separator />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 mt-1 place-items-center place-content-center">
          <FormField
            control={control}
            name="event.name"
            render={({ field, fieldState }) => (
              <FormItem className="relative flex flex-col w-full">
                <FormLabel htmlFor={field.name}>Name</FormLabel>
                <FormControl>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="An Incredible Event"
                    leftIcon={<IconSpeakerphone size={20} />}
                    variant={fieldState.error ? "error" : "default"}
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
            render={({ field, fieldState }) => (
              <FormItem className="relative flex flex-col w-full">
                <FormLabel htmlFor={field.name}>Category</FormLabel>
                <FormControl>
                  <Select
                    disabled={eventTypes?.length === 0}
                    onValueChange={(event) => {
                      field.onChange(event);
                      const eventType = eventTypes?.find(
                        (eventType) => eventType.id === event
                      );
                      setEventTypeClassName(
                        eventTypeUtils[eventType?.value || "default"].className
                      );
                    }}
                  >
                    <SelectTrigger
                      id={field.name}
                      name={field.name}
                      variant={fieldState.error ? "error" : "default"}
                      className={cn("w-[180px] duration-0", {
                        [eventTypeClassName]: field.value,
                      })}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-transparent">
                      {eventTypes &&
                        eventTypes.map((eventType, index) => (
                          <SelectItem
                            className={cn(
                              "rounded-none",
                              eventTypeUtils[eventType?.value || "default"]
                                .className,
                              {
                                "rounded-t-md": index === 0,
                                "rounded-b-md": index === eventTypes.length - 1,
                              }
                            )}
                            key={eventType.id}
                            value={eventType.id}
                          >
                            <Badge
                              icon={
                                eventTypeUtils[eventType?.value || "default"]
                                  .icon
                              }
                              variant={
                                eventTypeUtils[eventType?.value || "default"]
                                  .color
                              }
                              className="shadow-none"
                            >
                              {eventType?.value}
                            </Badge>
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
          render={({ field, fieldState }) => (
            <FormItem className="relative flex flex-col">
              <FormLabel htmlFor={field.name}>Description</FormLabel>
              <FormControl>
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder="Your detailed description"
                  variant={fieldState.error ? "error" : "default"}
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
            name="event.is_public"
            render={({ field }) => (
              <FormItem className="relative flex flex-col justify-center w-full">
                <div className="flex gap-2">
                  <FormLabel htmlFor={field.name}>Visibility</FormLabel>
                  <InfoTooltip
                    content={
                      <>
                        <p>
                          <strong>Public</strong> events are visible to any
                          contact with the link
                        </p>
                        <p>
                          <strong>Private</strong> events are only visible to
                          you.
                        </p>
                      </>
                    }
                  />
                </div>
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
