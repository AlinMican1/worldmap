import React, { ReactNode, useState } from "react";

interface ModalProps {
  openBtnName?: string;
  closeBtnName?: string;
  children: ReactNode;
}

const Modal = ({ children, openBtnName = "open", closeBtnName = "close" }: ModalProps) => {
  const [openModal, setOpenModal] = useState<Boolean>(false);

  return (
    <div>
      {openModal ? (
        <div>
          {children}
          <button onClick={() => setOpenModal(!openModal)}>{closeBtnName}</button>
        </div>
      ) : (
        <button onClick={() => setOpenModal(!openModal)}>{openBtnName}</button>
      )}
    </div>
  );
};
export default Modal;
