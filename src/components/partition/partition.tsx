import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Accidental, Voice, Formatter, BarlineType } from "vexflow";
import { classicNoteToVewflowNote } from "../../utils/note_conversion";


export const couleur: Record<string, string> = {
    "neutre": "black",
    "correct": "#00c251",
    "wrong": "#c20000",
}


export function Partition({notes_list}: {notes_list: Array<Array<string>>}) {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";

        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
        renderer.resize(430, 110);
        const context = renderer.getContext();

        // Dessin de la portée (x, y, largeur) avec la clé de Sol
        
        const stave = new Stave(0, 0, 410);
        stave.setEndBarType(BarlineType.END);
        stave.addClef("treble").setContext(context).draw();

        // Création et formatage des notes à la volée
        const notes = notes_list.map((note_) => {
            const noteName:string = note_[0]
            const status:string = note_[1] || "neutre"

            const vfKey = classicNoteToVewflowNote(noteName); // Octave 4 par défaut
            //console.log("note affiché", vfKey)
            const note = new StaveNote({ keys: [vfKey], duration: "q" });
            //console.log("bojnour")
            
            note.setStyle({ fillStyle: couleur[status], strokeStyle: couleur[status] });

            // Ajout du dièse ou bémol si présent
            if (noteName.includes("#")) note.addModifier(new Accidental("#"), 0);
            if (noteName.includes("b")) note.addModifier(new Accidental("b"), 0);

            return note;
        });

        // 5. Groupement des notes dans une Voix sans contrainte de mesure (Strict = false)
        const voice = new Voice().setStrict(false).addTickables(notes);

        // 6. Alignement automatique des notes sur la portée et dessin
        new Formatter().joinVoices([voice]).format([voice], 350);
        voice.draw(context, stave);

        // Nettoyage au démontage
        return () => {
            if (containerRef.current) containerRef.current.innerHTML = "";
        };
    }, [notes_list]);
    return <div ref={containerRef}></div>;
}
