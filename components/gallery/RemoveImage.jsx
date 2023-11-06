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

/**
 * RemoveImage component for handling the removal of selected images.
 * @param {Object} props - Component properties.
 * @param {Array} props.selectedIds - Array of selected photo IDs.
 * @param {Array} props.photos - Array of photos.
 * @param {Function} props.setPhotos - Function to update the photos state.
 * @param {Function} props.setSelectedIds - Function to update selected IDs state.
 * @returns {JSX.Element} - RemoveImage component.
 */
export default function RemoveImage({
  selectedIds,
  photos,
  setPhotos,
  setSelectedIds,
}) {
  // Custom hook to handle image removal
  const updatedPhotos = useRemoveCards(photos, selectedIds);

  /**
   * Handles the deletion of selected images.
   */
  const handleImageDeletion = () => {
    if (!selectedIds.length) return;

    // Update photos and reset selected IDs
    setPhotos(updatedPhotos);
    setSelectedIds([]);
  };

  // Render the RemoveImage component
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
                {selectedIds.length
                  ? "Are you absolutely sure? "
                  : "Please select a file"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                selected images.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleImageDeletion}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </p>
    </div>
  );
}
