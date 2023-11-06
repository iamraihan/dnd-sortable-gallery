import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useRemoveCards from "@/hooks/useRemoveCards";

export default function RemoveImage({
  selectedIds,
  photos,
  setPhotos,
  setSelectedIds,
}) {
  const updatedPhotos = useRemoveCards(photos, selectedIds);
  const handleImageDeletion = () => {
    if (!selectedIds.length) return;
    setPhotos(updatedPhotos);
    setSelectedIds([]);
  };

  return (
    <div className="flex justify-between py-5">
      <p>Selected Items: {selectedIds.length} </p>
      <p className="text-red-600">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">Delete Files</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {" "}
                {selectedIds.length
                  ? "Are you absolutely sure? "
                  : "Please select file"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleImageDeletion}>
                Delete{" "}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </p>
    </div>
  );
}
