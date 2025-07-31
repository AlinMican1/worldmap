import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./modal.css";

interface ModalProps {
  children: (close: () => void) => ReactNode;
  trigger: (open: () => void) => ReactNode;
}

const Modal = ({ children, trigger }: ModalProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const open = () => setOpenModal(true);
  const close = () => setOpenModal(false);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (openModal === true) {
      document.body.style.overflow = "hidden";

      // Disable selection for all elements except the modal
      document.querySelectorAll("body *").forEach((el) => {
        if (el !== modalElement && !modalElement?.contains(el)) {
          (el as HTMLElement).style.userSelect = "none";
        }
      });

      if (modalElement) {
        modalElement.style.userSelect = "auto";
      }
    } else {
      document.body.style.overflow = "unset";

      document.querySelectorAll("body *").forEach((el) => {
        (el as HTMLElement).style.userSelect = "";
      });
    }
    //Clean up function
    return () => {
      document.body.style.overflow = "unset";

      document.querySelectorAll("body *").forEach((el) => {
        (el as HTMLElement).style.userSelect = "";
      });
    };
  }, [openModal]);

  return (
    <div>
      {trigger(open)}
      {openModal && (
        <div className="modal-overlay" ref={modalRef}>
          <div className="modal">{children(close)}</div>
        </div>
      )}
    </div>
  );
};
export default Modal;
