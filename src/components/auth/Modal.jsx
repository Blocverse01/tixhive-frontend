export default function Modal({ showModal, setShowModal, title, content, footer }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="auth-modal overflow-x-auto bottom-0 left-0 right-0 fixed md:inset-0 z-[1050] outline-none focus:outline-none">
            <div className="flex items-center justify-center">
              <div className="relative flex-1 w-full max-w-3xl mx-auto md:my-6">
                {/*content*/}
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between pl-5 pr-5 border-b border-solid rounded-t md:pl-8 border-slate-200">
                    <h3 className="text-sm font-semibold text-center text-black md:text-left md:text-xl">{title}</h3>
                    <button
                      className="float-right p-1 mt-3 mb-3 ml-auto text-3xl font-normal leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="flex items-center justify-center w-10 h-10 text-3xl border rounded-full outline-none bg-slate-100 border-slate-300 text-slate-500 focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative flex-auto">{content}</div>
                  {/*footer*/}
                  {footer ? (
                    <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
                      {footer}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
