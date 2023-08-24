import { Spinner } from "@/components/shared/atoms/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconEdit, IconPencil } from "@tabler/icons-react";
import { getImageUrl } from "@/lib/utils";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface IUploadProfileImageProps {
  fullName?: string;
  image?: string;
  onChange: (file: File) => void;
  disabled?: boolean;
  isProfile?: boolean;
}

export const UploadProfileImage: React.FC<IUploadProfileImageProps> = ({
  fullName,
  image,
  onChange,
  disabled,
  isProfile,
}) => {
  const [imageURL, setImageURL] = useState<string | undefined>(
    image ? getImageUrl(image) : undefined
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgURL = URL.createObjectURL(e.target.files[0]);
      setImageURL(imgURL);
      onChange(e.target.files[0]);
    }
  };

  const handleSelectImage = () => {
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

  const uploadProfileClassName = cn({
    "relative w-full h-full": isProfile,
    "relative cursor-pointer group": !isProfile,
  });

  const avatarClassName = cn({
    "w-full h-full border-2 border-opacity-50 select-none border-memora-gray":
      isProfile,
    "transition-opacity group-hover:opacity-40": !isProfile,
  });

  const avatarFallbackClassName = cn({
    "text-6xl": isProfile,
    "select-none": !isProfile,
  });

  return (
    <div
      onClick={!isProfile ? handleSelectImage : () => {}}
      className={uploadProfileClassName}
    >
      {isProfile ? (
        <div
          onClick={handleSelectImage}
          className="absolute bottom-0 right-0 z-10 p-1 rounded-full cursor-pointer bg-memora-green hover:contrast-125"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="upload"
            disabled={disabled}
          />
          <IconPencil color="black" />
        </div>
      ) : (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload"
          disabled={disabled}
        />
      )}
      <Avatar className={avatarClassName}>
        <AvatarImage src={imageURL} />
        <AvatarFallback className={avatarFallbackClassName}>
          {image !== undefined && isProfile ? (
            <div className="pt-1">
              <Spinner />
            </div>
          ) : (
            getInitials(fullName)
          )}
        </AvatarFallback>
      </Avatar>
      {!isProfile && (
        <IconEdit
          size={20}
          className="absolute transition-opacity opacity-0 inset-1/4 group-hover:opacity-100"
        />
      )}
    </div>
  );
};
