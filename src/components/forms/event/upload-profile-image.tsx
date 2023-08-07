import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";

interface IUploadProfileImageProps {
  fullName?: string;
  onChange: (file: File) => void;
  disabled?: boolean;
}

export const UploadProfileImage: React.FC<IUploadProfileImageProps> = ({
  fullName,
  onChange,
  disabled,
}) => {
  const [imageURL, setImageURL] = useState<string | undefined>();
  // "https://cgkjgmtdxmqoruwpyojn.supabase.co/storage/v1/object/public/profiles/Contacto Test_3c5c18dc-baab-4134-9edf-9a40a612eb9e_1691048237034"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(imgURL);
      onChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (disabled) return;
    document.getElementById("upload")?.click();
  };

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("");
  };

  return (
    <div onClick={handleClick} className="relative cursor-pointer group">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="upload"
        disabled={disabled}
      />
      <Avatar className="transition-opacity group-hover:opacity-40">
        <AvatarImage src={imageURL} />
        <AvatarFallback className="select-none">
          {getInitials(fullName)}
        </AvatarFallback>
      </Avatar>
      <IconEdit
        size={20}
        className="absolute transition-opacity opacity-0 inset-1/4 group-hover:opacity-100"
      />
    </div>
  );
};
