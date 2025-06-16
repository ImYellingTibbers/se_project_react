import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ activeModal, closeModal, onLogin, switchModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    if (activeModal === "login") {
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  }, [activeModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }, setErrorMessage);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      closeModal={closeModal}
      isOpen={activeModal === "login"}
      onSubmit={handleSubmit}
      switchModal={switchModal}
    >
      {errorMessage && (
        <span className="modal__error-message">{errorMessage}</span>
      )}
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className={`modal__input ${errorMessage ? "modal__input_error" : ""}`}
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          type="password"
          className={`modal__input ${errorMessage ? "modal__input_error" : ""}`}
          id="password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
