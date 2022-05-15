import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import ViewTicket from "./ViewTicket";
import {useState} from "react";


export default function TicketCard({ ticket, event }) {
    const [modal, setOpen] = useState(false);
    return (
        <section className={"mb-7"}>
            <div className={"bg-event-gradient"}>
                <div
                    className={"border-b px-5 flex justify-between items-center pt-3 border-slate-300 pb-3"}>
                    <h3 className={"font-semibold"}>Ticket</h3>
                    <button onClick={() => setOpen(true) } className={"py-1 md:py-2 bg-black-gradient px-2"}>
                        <FontAwesomeIcon icon={solid("image")} className={"md:hidden"}/>
                        <span className={"hidden md:block"}>View Ticket Image</span>
                    </button>
                </div>
                <div>
                    <div className={"grid-cols-3 text-center grid border-slate-300"}>
                        <div className={"p-3 border-r border-b"}>
                            Token ID
                        </div>
                        <div className={"p-3 border-r border-b"}>Name</div>
                        <div className={"p-3 border-b"}>Cost</div>
                        <div className={"p-3 border-r"}>{ticket.tokenId}</div>
                        <div className={"p-3 border-r truncate"}>{ticket.name}</div>
                        <div className={"p-3"}>{ticket.cost}</div>
                    </div>
                </div>
            </div>
            {modal ?
            <div className="mint-modal-content fixed w-[90%] bottom-5 mx-auto top-5">
                <div className="mint-modal-header">
                    <h3 className="mint-modal-title">Your ticket for {event.name}</h3>
                    <button onClick={() => setOpen(false) } className={"text-brand-red"}>
                        <FontAwesomeIcon icon={solid("times")} className={"text-2xl"}/>
                    </button>
                </div>
                <div className="py-[32px] flex justify-center">
                    <ViewTicket tokenId={ticket.tokenId} event={event} />
                </div>
            </div> : ""}
        </section>
    )
}