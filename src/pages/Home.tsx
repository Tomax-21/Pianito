import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div>
            <h1>Bienvenue sur Pianito</h1>
            <button><Link to={"/level-select"}>Selectionnez un niveau</Link></button>
        </div>
    );
}