import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ activeModal, closeModal, onRegister, switchModal }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (activeModal === "register") {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [activeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Register"
      closeModal={closeModal}
      isOpen={activeModal === "register"}
      onSubmit={handleSubmit}
      switchModal={switchModal}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
