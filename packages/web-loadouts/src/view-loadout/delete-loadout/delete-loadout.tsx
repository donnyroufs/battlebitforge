"use client";

import { useState } from "react";
import { Button } from "@bbforge/design-system";
import { MdDelete } from "react-icons/md";
import { AiFillCloseSquare } from "react-icons/ai";
import { useRouter } from "next/navigation";

type DeleteLoadoutProps = {
  loadoutName: string;
  onDelete(): Promise<void>;
};

export function DeleteLoadout(props: DeleteLoadoutProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  async function onDelete() {
    await props.onDelete();
    router.back();
  }

  return (
    <>
      <Modal
        setShow={setShowModal}
        show={showModal}
        loadoutName={props.loadoutName}
        onDelete={onDelete}
      />
    </>
  );
}

type ModalProps = {
  show: boolean;
  setShow(val: boolean): void;
  loadoutName: string;
  onDelete(): Promise<void>;
};

export default function Modal(props: ModalProps) {
  return (
    <>
      <Button variant="secondary" onClick={() => props.setShow(true)}>
        <div className="flex items-center justify-center text-gray-400">
          <MdDelete className="mr-2" />
          Delete
        </div>
      </Button>
      {props.show ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-[#10111A] outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-800 rounded-t">
                  <h3 className="text-2xl font-semibold capitalize">
                    Delete loadout?
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShow(false)}
                  >
                    <span className="">
                      <AiFillCloseSquare className="fill-slate-400" />
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed max-w-[32ch]">
                    You are about to delete your loadout{" "}
                    <span className="font-bold text-[#FE9B00] ">
                      {props.loadoutName}
                    </span>
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6">
                  <button
                    className="bg-red-700 text-white active:bg-red-800 hover:bg-red-800 font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full"
                    type="button"
                    onClick={() => props.onDelete()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
