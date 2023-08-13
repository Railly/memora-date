import { useState } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface IConfirmDialogProps {
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
  triggerClassName?: string;
}

const CancelButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="secondary"
    className="flex w-full gap-1"
    type="button"
    onClick={onClick}
  >
    <IconX size={20} />
    <span>Cancel</span>
  </Button>
);

const ConfirmButton = ({ onClick }: { onClick: () => void }) => (
  <Button type="submit" className="flex w-full gap-1" onClick={onClick}>
    <IconCheck size={20} />
    <span>Confirm</span>
  </Button>
);

export const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  onConfirm,
  onCancel,
  title,
  description,
  children,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);

  const closeDialog = () => setIsOpen(false);

  const handleCancel = () => {
    onCancel?.();
    closeDialog();
  };

  const handleConfirm = () => {
    onConfirm();
    closeDialog();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        aria-controls="dialog"
        className={triggerClassName}
        onClick={openDialog}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full gap-4 mt-4">
            <CancelButton onClick={handleCancel} />
            <ConfirmButton onClick={handleConfirm} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
