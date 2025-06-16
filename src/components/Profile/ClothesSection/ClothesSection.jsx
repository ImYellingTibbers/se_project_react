import { useContext } from "react";

import ItemCard from "../../Main/ItemCard/ItemCard";
import "./ClothesSection.css";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, clothingItems, onAddClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__header_text">Your items</p>
        <button className="clothes-section__header_btn" onClick={onAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} onCardLike={onCardLike}/>
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
