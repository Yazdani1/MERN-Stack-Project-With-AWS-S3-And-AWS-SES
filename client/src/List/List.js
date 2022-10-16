import React ,{useState}from "react";
import listStyle from "./List.module.css";
import PageLayout from "../PageLayout";

const List = () => {
  const data = [
    { id: 1, letter: "A" },
    { id: 2, letter: "B" },
    { id: 3, letter: "C" },
    { id: 4, letter: "D" },
    { id: 5, letter: "E" },
    { id: 6, letter: "F" },
  ];

  const [items, setItems] = useState(data);

  const reorder = (id) => {
    let firstItem;
    const filteredItems = items.filter((item) => {
      if (item.id === id) {
        firstItem = [item];
        return false;
      }
      return true;
    });
    setItems([...firstItem, ...filteredItems]);
  };

  return (
    <PageLayout>
      <div className="container">
        <div className={listStyle.mainCard}>
        
            {items.map((item) => (
              <div
                onClick={() => reorder(item.id)}
                className={listStyle.itemCard}
              >
                {item.letter}
              </div>
            ))}
        
        </div>
      </div>
    </PageLayout>
  );
};

export default List;
