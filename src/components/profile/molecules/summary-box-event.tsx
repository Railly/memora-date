interface SummaryBoxEventProps {
  title: string;
  children: React.ReactNode;
}

const SummaryBoxEvent: React.FC<SummaryBoxEventProps> = ({
  title,
  children,
}) => {
  return (
    <div className="relative flex flex-col items-start w-full gap-3">
      <p className="font-medium text-white text-md">{title}</p>
      <div className="grid max-w-full grid-flow-col gap-3 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default SummaryBoxEvent;
