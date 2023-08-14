"use client";

import { useState } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";

import { useSearch } from "@/hooks/useSearch";
import { EventWithType } from "@/lib/entities.types";
import clientApiProvider from "@/services/client";
import EventCard, { EventCardSkeleton } from "../shared/molecules/event-card";
import { Input } from "../ui/input";
import EventsEmptyState from "../shared/molecules/events-empty-state";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface IEventsSectionProps {
  initialEvents: EventWithType[] | null;
  isSkeleton?: boolean;
}

export const EventsSection: React.FC<IEventsSectionProps> = ({
  initialEvents,
  isSkeleton,
}) => {
  const [events, setEvents] = useState<EventWithType[] | null>(initialEvents);

  const { search, setSearch, handleSupabaseSearch } = useSearch();

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedSearch = handleSupabaseSearch();

    if (!parsedSearch) return;

    // Search
    const { data, error } = await clientApiProvider.event.searchEvents({
      column: "title_description",
      searchTerm: parsedSearch,
    });

    setEvents(data);

    console.log({ data, error });
  };

  const clearSearch = () => {
    setSearch("");
    setEvents(initialEvents);
  };

  return (
    <section className="flex flex-col items-center w-full gap-6">
      <form onSubmit={onSearch} className="flex w-full">
        <Input
          id="search-events"
          aria-controls="search-events"
          placeholder="Search for events"
          leftIcon={<IconSearch size={20} />}
          rightIcon={
            <>
              {search.length > 0 && (
                <IconX
                  size={20}
                  className="cursor-pointer"
                  onClick={clearSearch}
                />
              )}
            </>
          }
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          variant={"default"}
        />
        <Button
          type="submit"
          variant="secondary"
          className={cn("ml-2", {
            "opacity-50 cursor-not-allowed": search.length === 0,
          })}
          disabled={search.length === 0}
        >
          <IconSearch
            size={20}
            className={cn("mr-2", {
              "text-gray-400": search.length === 0,
            })}
          />
          <span
            className={cn("text-sm font-semibold", {
              "text-gray-400": search.length === 0,
            })}
          >
            Search
          </span>
        </Button>
      </form>
      {isSkeleton
        ? Array.from({ length: 3 }, (_, index) => (
            <EventCardSkeleton key={index} />
          ))
        : events?.map((event) => <EventCard key={event.id} event={event} />)}
      {events?.length === 0 && <EventsEmptyState />}
    </section>
  );
};
