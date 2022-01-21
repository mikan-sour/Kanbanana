import React from "react"
import { createPortal } from "react-dom"
import { ModalBody, ModalHeader, ModalOverlay, ModalWrapper } from "./styled";
import { GoX } from "react-icons/go";
   


const Modal:React.FC<{isOpen:boolean,handleClose:()=>void,title:string}>= ({ handleClose,isOpen,title,children }) => {

   if(!isOpen) return null;
    
   const [mounted, setMounted] = React.useState<boolean>(false);

   React.useEffect(() => {
      setMounted(true);

      return () => setMounted(false);

   }, [])

   const ModalComponent:React.FC<{}> = ({children}) => (
      <>
         <ModalOverlay id='modal_overlay' onClick={handleClose}/>
         <ModalWrapper >
            <ModalHeader>
               <h3>{title}</h3>
               <GoX size={'1.75rem'} color={'darkgrey'} style={{padding:'8px'}} onClick={handleClose} />
            </ModalHeader>
            <ModalBody>
               {children}
            </ModalBody>
         </ModalWrapper>
      </>
   )
   

   return mounted ? createPortal(<ModalComponent>{children}</ModalComponent>, document.querySelector("#modal-portal")) : null;
}

export default Modal;