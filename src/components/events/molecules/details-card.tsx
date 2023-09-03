interface IEventDetailsCardProps {
  icon: JSX.Element;
  title: string;
  content: string | React.ReactNode;
}

export const EventDetailsCard: React.FC<IEventDetailsCardProps> = ({
  icon,
  title,
  content,
}) => {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-md bg-muted text-primary border border-form-stroke/20 h-24 w-28">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <div className="flex items-center justify-center rounded-md p-0.5">
            {icon}
          </div>
          <p className="text-sm font-medium">{title}</p>
        </div>
      </div>
      <div className="h-full flex flex-col justify-center items-center gap-1">
        <p className="font-bold leading-snug line-clamp-3 text-lg text-center">
          {content}
        </p>
      </div>
    </div>
  );
};

export const EventDetailsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-md text-black bg-[#ECF2F9] h-24 w-28">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-1">
          <span className="w-5 h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
          <span className="w-10 h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
        </div>
      </div>
      <div className="h-full flex flex-col justify-center items-center gap-1">
        <span className="w-full h-6 my-1 text-2xl font-bold bg-gray-400 animate-pulse" />
      </div>
    </div>
  );
};
