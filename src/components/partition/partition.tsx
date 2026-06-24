import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Accidental, Voice, Formatter } from "vexflow";

export function Partition({notes_list}: {notes_list: Array<string>}) {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";

        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
        renderer.resize(330, 110);
        const context = renderer.getContext();

        // Dessin de la portée (x, y, largeur) avec la clé de Sol
        const stave = new Stave(0, 0, 310);
        stave.addClef("treble").setContext(context).draw();

        // Création et formatage des notes à la volée
        const notes = notes_list.map((noteName) => {
            const vfKey = `${noteName[0]}/${noteName[-1] ?? 4}`; // Octave 4 par défaut
            const note = new StaveNote({ keys: [vfKey], duration: "q" });
            // Ajout du dièse ou bémol si présent
            if (noteName.includes("#")) note.addModifier(new Accidental("#"), 0);
            if (noteName.includes("b")) note.addModifier(new Accidental("b"), 0);

            return note;
        });

        // 5. Groupement des notes dans une Voix sans contrainte de mesure (Strict = false)
        const voice = new Voice().setStrict(false).addTickables(notes);

        // 6. Alignement automatique des notes sur la portée et dessin
        new Formatter().joinVoices([voice]).format([voice], 230);
        voice.draw(context, stave);

        // Nettoyage au démontage
        return () => {
            if (containerRef.current) containerRef.current.innerHTML = "";
        };
    }, [notes_list]);
    return <div ref={containerRef}></div>;
}
