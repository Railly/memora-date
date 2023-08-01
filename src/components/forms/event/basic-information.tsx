import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateEventSchema } from "@/schemas/event.schema";
import { EventType } from "@/types/entities";
import { IconSpeakerphone } from "@tabler/icons-react";
import {
  Controller,
  UseFormRegister,
  Control,
  FieldErrors,
} from "react-hook-form";
import { Visibility } from "./visibility";

interface IBasicInformationProps {
  eventTypes: EventType[];
  register: UseFormRegister<CreateEventSchema>;
  control: Control<CreateEventSchema>;
  errors: FieldErrors<CreateEventSchema>;
}
export const BasicInformation: React.FC<IBasicInformationProps> = ({
  eventTypes,
  register,
  control,
  errors,
}) => {
  return (
    <div className="space-y-2">
      <p className="text-[#B4B4B4] text-sm">Basic information</p>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4 place-items-center place-content-center">
          <div className="relative flex flex-col w-full gap-2">
            <Label htmlFor="email">Name</Label>
            <Input
              id="event.name"
              type="text"
              placeholder="An Incredible Event"
              withIcon={<IconSpeakerphone size={20} />}
              variant={errors.event?.name ? "error" : "default"}
              {...register("event.name", { required: true })}
            />
            {errors.event?.name && (
              <p className="absolute text-xs text-red-500 -bottom-4">
                {errors.event.name?.message}
              </p>
            )}
          </div>
          <div className="relative flex flex-col w-full gap-2">
            <Label htmlFor="email">Category</Label>
            <Controller
              name="event_type.type"
              control={control}
              defaultValue=""
              render={({ field: { onChange } }) => (
                <div className="w-full">
                  <Select onValueChange={onChange}>
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
                </div>
              )}
            />
            {errors.event_type?.type && (
              <p className="absolute text-xs text-red-500 -bottom-4">
                {/* @ts-ignore */}
                {errors.event_type.type?.message}
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="event.description"
            placeholder="Your detailed description"
            variant={errors.event?.description ? "error" : "default"}
            {...register("event.description", { required: true })}
          />
          {errors.event?.description && (
            <p className="absolute text-xs text-red-500 -bottom-4">
              {errors.event.description?.message}
            </p>
          )}
        </div>
        <div className="flex w-full gap-4">
          <div className="relative flex flex-col justify-center w-1/2 gap-2">
            <Label htmlFor="date">Date</Label>
            <DatePicker />
          </div>
          <div className="relative flex flex-col justify-center w-1/2 gap-2 text-memora">
            <Label htmlFor="visibility">Visibility</Label>
            <Visibility />
          </div>
        </div>
      </div>
    </div>
  );
};
