import { NothingSelected } from "./NothingSelected";
import { NoteScreen } from "../notes/NoteScreen";
import { Sidebar } from "./Sidebar";
import { useSelector } from "react-redux";

export const JournalScreen = () => {

    const { active } = useSelector( ({ notes }) => notes );
    

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">

            <Sidebar />

            <main>
                {
                    ( !!active )
                       ? ( <NoteScreen /> )
                       : ( <NothingSelected /> )
                }
                

            </main>
        </div>    
    )
  };