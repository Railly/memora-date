"use client";

import { IconSearch } from "@tabler/icons-react";
import { useRef, useState } from "react";

import { EventWithType } from "@/lib/entities.types";
import clientApiProvider from "@/services/client";
import EventCard from "../shared/molecules/event-card";
import { Input } from "../ui/input";

interface IEventsSectionProps {
  initialEvents: EventWithType[] | null;
}

export const EventsSection: React.FC<IEventsSectionProps> = ({
  initialEvents,
}) => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventWithType[] | null>(initialEvents);

  const previousSearch = useRef(search);

  const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Split search by spaces
    const splittedSearch = search.split(" ");
    // Remove empty strings
    const filteredSearch = splittedSearch.filter((search) => search !== "");
    // Join by &
    const parsedSearch = filteredSearch.join("&");
    // Trim
    const trimmedSearch = parsedSearch.trim();
    // If empty, return
    if (trimmedSearch.length === 0) return;

    // If same as previous, return
    const currentParsedSearch = trimmedSearch.toLowerCase();
    const previousSearchParsed = previousSearch.current.toLowerCase();
    if (currentParsedSearch === previousSearchParsed) return;

    // Update previous search
    previousSearch.current = parsedSearch;

    // Search
    const { data, error } = await clientApiProvider.event.searchEvents({
      column: "title_description",
      searchTerm: parsedSearch,
    });

    setEvents(data);

    console.log({ data, error });
  };
  return (
    <section className="flex flex-col items-center w-full gap-6">
      <form onSubmit={onSearch} className="flex w-full">
        <Input
          id="search-events"
          placeholder="Search for events"
          withIcon={<IconSearch size={20} />}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          variant={"default"}
        />
      </form>
      {events?.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </section>
  );
};
