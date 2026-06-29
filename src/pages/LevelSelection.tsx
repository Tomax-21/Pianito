import { Link } from "react-router-dom";

export default function LevelSelectionPage() {
    return (

        <div>
            <button><Link to={"/learn-notes"}>Niveau Random</Link></button>
            <button><Link to={"/learn-notes/1"}>Niveau 1</Link></button>
        </div>
    )
}