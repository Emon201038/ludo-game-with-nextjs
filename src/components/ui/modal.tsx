"use client";
import { playSound } from "@/helper/SoundUtility";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext<{ isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> } | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const ModalProvider = ({ isOpen, setIsOpen, children }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; children: React.ReactNode }) => {
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export const Modal = ({ children, open = false, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [isOpen, setIsOpen] = useState(open);

  // Sync internal state when `open` prop changes
  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <ModalProvider isOpen={isOpen} setIsOpen={onOpenChange ? onOpenChange : setIsOpen} >
      {children}
    </ModalProvider>
  );
};

const ModalOverlay = ({ children }: { children: React.ReactNode }
  // { className, ...props }: React.ComponentPropsWithoutRef<"div">
) => {
  return (
    <div className={
      "fixed inset-0 z-100 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"}>{children}</div>
  );
};

export const ModalContent = ({ itemScope = true, className, children, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const { isOpen, setIsOpen } = useModal();
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <div {...props} className={cn("fixed left-[50%] top-[50%] z-50  max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg w-[342px] bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 flex flex-col justify-center items-center rounded-md", className)}>
        {itemScope && <button className="absolute -right-4 -top-4 "><Image src="/images/cross.png" alt="close" width={50} height={50} onClick={() => {
          playSound("click");
          setIsOpen(false)
        }} className="cursor-pointer z-50" /></button>}
        {children}
      </div>
    </ModalOverlay>
  )
}

export const ModalClose = ({ children, ...props }: React.ComponentPropsWithoutRef<"button">) => {
  const { setIsOpen } = useModal()
  return (
    <button {...props} onClick={() => {
      playSound("click");
      setIsOpen(false);
    }}>{children}</button>
  )
}

export const ModalTrigger = ({ children, ...props }: React.ComponentPropsWithoutRef<"button">) => {
  const { setIsOpen } = useModal()
  return (
    <button {...props} onClick={() => {
      playSound("click");
      setIsOpen(true)
    }}>{children}</button>
  )
}
