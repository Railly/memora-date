"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconSearch, IconX } from "@tabler/icons-react";

import { useSearch } from "@/hooks/useSearch";
import { EventWithType } from "@/lib/entities.types";
import { cn } from "@/lib/utils";
import clientApiProvider from "@/services/client";
import EventCard, { EventCardSkeleton } from "../shared/molecules/event-card";
import EventsEmptyState from "../shared/molecules/events-empty-state";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

interface IEventsSectionProps {
  events: EventWithType[] | null;
  isSkeleton?: boolean;
}

export const EventsSection: React.FC<IEventsSectionProps> = ({
  events,
  isSkeleton,
}) => {
  const [results, setResults] = useState(events);

  const { toast } = useToast();

  const router = useRouter();

  const { search, setSearch, handleSupabaseSearch, onClearSearch } =
    useSearch();

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedSearch = handleSupabaseSearch();

    if (!parsedSearch) return;

    try {
      // Search
      const { data, error } = await clientApiProvider.event.searchEvents({
        column: "title_description",
        searchTerm: parsedSearch,
      });

      setResults(data);

      router.refresh();
      console.log({ data, error });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "danger",
      });
    }
  };

  const clearSearch = () => {
    onClearSearch();
    setResults(events);
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
        : (search.length > 0 ? results : events)?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
      {(events?.length === 0 || results?.length === 0) && <EventsEmptyState />}
    </section>
  );
};
