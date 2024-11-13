import React from "react";
import Modal from "./modal";

type props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function TermsAndCondition({isOpen, setIsOpen}:props) {
  
  const onClose = ()=>{
    setIsOpen(false)
  }
  return(
    <div>
      <Modal isOpen={isOpen} title="Termos e Condições" onClose={onClose}>
        <iframe src="" width={400} height={300}></iframe>
      </Modal>

    </div>
  )
}
