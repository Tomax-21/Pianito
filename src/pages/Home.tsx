import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/learn-notes'); // Redirection vers le jeu !
    };
    
    return (
        <div>
            <h1>Bienvenue sur Pianito</h1>
            <button onClick={handleStart}>Lancer le Piano</button>
        </div>
    );
}