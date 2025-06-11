import { useState, useEffect, useContext } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ activeModal, closeModal, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, activeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      buttonText="Save"
      activeModal={activeModal}
      closeModal={closeModal}
      onSubmit={handleSubmit}
    >
      <label>
        Name
        <input
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Avatar URL
        <input
          type="url"
          name="avatar"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
