'use client';

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
  isOpen?: boolean; // Prop indicating if the modal is open
  onClose: () => void; // Function to handle modal close
  onSubmit: () => void; // Function to handle form submission within the modal
  title?: string; // Optional title for the modal
  body?: React.ReactElement; // Optional body content for the modal
  footer?: React.ReactElement; // Optional footer content for the modal
  actionLabel: string; // Label for the primary action button
  disabled?: boolean; // Flag to disable interaction with the modal
  secondaryAction?: () => void; // Optional secondary action function
  secondaryActionLabel?: string; // Label for the secondary action button
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  body, 
  actionLabel, 
  footer, 
  disabled,
  secondaryAction,
  secondaryActionLabel
}) => {
  const [showModal, setShowModal] = useState(isOpen); // State to control modal visibility

  useEffect(() => {
    setShowModal(isOpen); // Update showModal state when isOpen prop changes
  }, [isOpen]);

  // Function to handle modal close
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
  
    setShowModal(false); // Hide the modal
    setTimeout(() => {
      onClose(); // Execute onClose callback after animation
    }, 300)
  }, [onClose, disabled]);

  // Function to handle form submission
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit(); // Execute onSubmit callback
  }, [onSubmit, disabled]);

  // Function to handle secondary action
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction(); // Execute secondaryAction callback if defined
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null; // Render nothing if modal is not open
  }

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
      >
        <div className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-full 
          lg:h-auto
          md:h-auto
          "
        >
          {/*content*/}
          <div className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0 
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              {/*header*/}
              <div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
              >
                <button
                  className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                {body}
              </div>
              {/*footer*/}
              <div className="flex flex-col gap-2 p-6">
                <div 
                  className="
                    flex 
                    flex-row 
                    items-center 
                    gap-4 
                    w-full
                  "
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button 
                      disabled={disabled} 
                      label={secondaryActionLabel} 
                      onClick={handleSecondaryAction}
                      outline
                    />  
                  )}
                  <Button 
                    disabled={disabled} 
                    label={actionLabel} 
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
