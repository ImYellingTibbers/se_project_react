import ItemCard from "../../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ onCardClick, clothingItems }) {
  return (
    <>
      <div className="clothes-section">
        <div>
          <p>Your items</p>
          <button>+ Add New</button>
        </div>
        <ul className="clothes-section__list">
          {clothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ClothesSection;
