import { useCallback, useState } from "react";

export const useToggle = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return [open, handleToggle, setOpen] as const;
};
