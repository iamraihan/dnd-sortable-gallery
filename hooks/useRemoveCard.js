import React, { useState, useEffect } from "react";

const useRemoveCard = (totalCollection, removableIds) => {
  const [items, setItems] = useState(totalCollection);

  const handleDelete = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const handleDeleteMultiple = (ids) => {
      setItems((prevItems) =>
        prevItems.filter((item) => !ids.includes(item.id))
      );
    };

    handleDeleteMultiple(removableIds);
  }, [removableIds]);

  return items;
};

export default useRemoveCard;
