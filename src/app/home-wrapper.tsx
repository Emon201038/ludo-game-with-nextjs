"use client";
import { Modal, ModalContent } from "@/components/ui/modal";
import React, { useEffect } from "react";

const HomeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [openModal, setOpenModal] = React.useState(false);
  useEffect(() => {
    const sound = new Audio("/sfx/home.mp3");
    sound.loop = true;

    const handleClick = () => {
      const clickSound = new Audio("/sfx/click.mp3");
      clickSound.play().catch(err => {
        console.error("Failed to play sound:", err);
      })
      sound.play().catch(err => {
        console.error("Failed to play sound:", err);
      });
      document.removeEventListener("click", handleClick); // Prevent multiple play calls
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      sound.pause();
    };
  }, []);

  // useEffect(() => {
  //   const handleClick = (e) => {
  //     console.log(e.target)
  //     const clickSound = new Audio("/sfx/click.mp3");
  //     clickSound.play().catch(err => {
  //       console.error("Failed to play sound:", err);
  //       document.removeEventListener("click", handleClick); // Prevent multiple play calls
  //     })
  //   };

  //   document.addEventListener("click", handleClick);

  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   }
  // })

  useEffect(() => {
    setOpenModal(true);
  }, []);

  return <div style={{ backgroundImage: "url('/images/bg.jpg')" }} className="w-screen h-screen justify-center items-center flex">
    <Modal open={openModal} onOpenChange={setOpenModal}>
      <ModalContent style={{ fontFamily: "Luckiest Guy, cursive", }} className='w-[342px] bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 flex flex-col justify-center items-center rounded-md p-3 text-white'>
        <h1>Welcome to Ludo</h1>
        <p className="text-center">We are trying to improve our game and make it more fun.</p>
        {/* <ModalClose className='relative cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 h-full px-4 py-0 rounded-2xl border-3 border-yellow-500 shadow-[0_0.5px_5px_yellow] backdrop-blur-3xl flex justify-center items-center' style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.6)",
          fontFamily: "Luckiest Guy, cursive",
          fontSize: "20px",
          fontWeight: "bolder"
        }}>
          <div className="absolute inset-0 rounded-2xl border-2 border-black opacity-30 pointer-events-none"></div>
          Close
        </ModalClose> */}
      </ModalContent>
    </Modal>{children}</div>;
};

export default HomeWrapper;
