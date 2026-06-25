import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Accidental, Voice, Formatter } from "vexflow";
import { classicNoteToVewflowNote } from "../../utils/note_conversion";
import type { note_status } from "../piano/piano_types";

export function Partition({notes_list, status}: {notes_list: Array<string>, status:note_status}) {
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

        let noteColor = "black";
        console.log(status)
        if (status === "correct") noteColor = "#00c251"; // Un joli vert
        if (status === "wrong") noteColor = "#c20000";   // Un joli rouge

        // Création et formatage des notes à la volée
        const notes = notes_list.map((noteName) => {
            const vfKey = classicNoteToVewflowNote(noteName); // Octave 4 par défaut
            console.log("note affiché", vfKey)
            const note = new StaveNote({ keys: [vfKey], duration: "q" });

            note.setStyle({ fillStyle: noteColor, strokeStyle: noteColor });

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
    }, [notes_list, status]);
    return <div ref={containerRef}></div>;
}
