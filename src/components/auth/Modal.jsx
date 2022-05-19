export default function Modal({
  showModal,
  setShowModal,
  title,
  content,
  footer,
}) {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden auth-modal overflow-y-auto bottom-0 left-0 right-0 fixed md:inset-0 z-[1050] outline-none focus:outline-none">
            <div className="relative w-auto md:my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between pl-5 md:pl-8 pr-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-sm text-center md:text-left md:text-xl text-black font-semibold">
                    {title}
                  </h3>
                  <button
                    className="p-1 mb-3 mt-3 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-normal outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-slate-100 border-slate-300 border rounded-full flex justify-center items-center text-slate-500 h-10 w-10 text-3xl outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto">{content}</div>
                {/*footer*/}
                {footer ? (
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    {footer}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
