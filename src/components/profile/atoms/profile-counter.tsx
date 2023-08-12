interface ProfileCounterProps {
  quantity: number | null;
  type: string;
}

const ProfileCounter: React.FC<ProfileCounterProps> = ({ quantity, type }) => {
  return (
    <p className="flex flex-col items-center">
      <span className="text-2xl font-bold text-white">
        {quantity === null ? "0" : quantity}
      </span>
      <span className="text-sm font-medium text-zinc-500">{type}</span>
    </p>
  );
};

export default ProfileCounter;
