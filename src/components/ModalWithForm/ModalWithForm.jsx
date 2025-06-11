import { useEffect } from "react";

import "./ModalWithForm.css";
import modalCloseX from "../../assets/modal-close-x.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  closeModal,
  isOpen,
  onSubmit,
  switchModal,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={modalCloseX} alt="Close" />
        </button>
        <form onSubmit={onSubmit} action="" className="modal__form">
          {children}
          <div className="modal__btns">
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>
            {(title === "Sign Up" || title === "Log in") && (
              <p className="modal__alt">
                or
                <button
                  type="button"
                  className="modal__alt-link"
                  onClick={() =>
                    title === "Sign Up"
                      ? switchModal("login")
                      : switchModal("register")
                  }
                >
                  {title === "Sign Up" ? "Log in" : "Register"}
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
