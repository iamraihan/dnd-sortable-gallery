import React, { useState, useEffect } from "react";

/**
 * Custom hook for handling the removal of cards from a collection.
 * @param {Array} totalCollection - The total collection of items.
 * @param {Array} removableIds - The array of IDs to be removed.
 * @returns {Array} - The updated collection after removal.
 */
const useRemoveCards = (totalCollection, removableIds) => {
  // State to manage the collection of items
  const [items, setItems] = useState(totalCollection);

  /**
   * Handles the deletion of a single item by ID.
   * @param {number} id - The ID of the item to be deleted.
   */
  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Effect to handle deletion of multiple items when removableIds change
  useEffect(() => {
    /**
     * Handles the deletion of multiple items by their IDs.
     * @param {Array} ids - The array of IDs to be deleted.
     */
    const handleDeleteMultiple = (ids) => {
      setItems((prevItems) =>
        prevItems.filter((item) => !ids.includes(item.id))
      );
    };

    // Call handleDeleteMultiple when removableIds change
    handleDeleteMultiple(removableIds);
  }, [removableIds]);

  // Return the updated collection
  return items;
};

export default useRemoveCards;
