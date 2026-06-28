import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Accidental, Voice, Formatter, BarlineType, GhostNote, StaveConnector } from "vexflow";
import { classicNoteToVewflowNote } from "../../utils/note_conversion";


export const couleur: Record<string, string> = {
    "neutre": "black",
    "correct": "#00c251",
    "wrong": "#c20000",
}


export function Partition({notes_list, show_all_staves=false}: {notes_list: Array<Array<string>>, show_all_staves?:boolean}) {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) return;

        containerRef.current.innerHTML = "";

        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
        renderer.resize(450, 220);
        const context = renderer.getContext();

        // Dessin de la portée (x, y, largeur) avec la clé de Sol
        const trebleStave = new Stave(15, 0, 420);
        trebleStave.setEndBarType(BarlineType.END);
        trebleStave.addClef("treble").setContext(context)


        const bassStave = new Stave(15, 100, 420)
        bassStave.setEndBarType(BarlineType.END)
        bassStave.addClef("bass").setContext(context)

        const trebleNotes: (StaveNote | GhostNote)[] = []
        const bassNotes: (StaveNote | GhostNote)[] = []

        let hasRealNoteInTrebleNotesList:boolean = false
        let hasRealNoteInBassNotesList:boolean = false

        // Création et formatage des notes à la volée
        notes_list.map((note_) => {
            const noteName:string = note_[0] //C4, A#3
            const status:string = note_[1] || "neutre"

            const octave = noteName.slice(-1)

            const vfKey = classicNoteToVewflowNote(noteName); // Octave 4 par défaut
            //console.log("note affiché", vfKey)

            const isTrebleClef = parseInt(octave) >=4

            const note = new StaveNote({ keys: [vfKey], duration: "q", clef: isTrebleClef?"treble":"bass" });
            
            note.setStyle({ fillStyle: couleur[status], strokeStyle: couleur[status] });

            // Ajout du dièse ou bémol si présent
            if (noteName.includes("#")) note.addModifier(new Accidental("#"), 0);
            if (noteName.includes("b")) note.addModifier(new Accidental("b"), 0);

            if (isTrebleClef) {
                trebleNotes.push(note);
                bassNotes.push(new GhostNote({ duration: "q" }));
                hasRealNoteInTrebleNotesList = true

            } else {
                bassNotes.push(note);
                // On met une note invisible (GhostNote) en haut pour maintenir l'alignement horizontal
                trebleNotes.push(new GhostNote({ duration: "q" }));
                hasRealNoteInBassNotesList = true
            }

            
            return note;
        });

        // 5. Groupement des notes dans une Voix sans contrainte de mesure (Strict = false)
        const trebleVoice = new Voice().setStrict(false).addTickables(trebleNotes);
        const bassVoice = new Voice().setStrict(false).addTickables(bassNotes);

        // 6. Alignement automatique des notes sur la portée et dessin
        new Formatter()
            .joinVoices([trebleVoice])
            .joinVoices([bassVoice])
            .format([trebleVoice, bassVoice], 350);
        
        if (show_all_staves) {
            trebleStave.draw();
            bassStave.draw()
        }
        if (hasRealNoteInTrebleNotesList) {
            if (!show_all_staves) trebleStave.draw() //pas besoin de redessiner 2 fois
            trebleVoice.draw(context, trebleStave)
        } 
        if (hasRealNoteInBassNotesList) {
            if (!show_all_staves) bassStave.draw()
            bassVoice.draw(context, bassStave)
        }

        if (show_all_staves || (hasRealNoteInTrebleNotesList && hasRealNoteInBassNotesList)) {
            const brace = new StaveConnector(trebleStave, bassStave);
            brace.setType(StaveConnector.type.BRACE);
            brace.setContext(context).draw();
        }

        // Nettoyage au démontage
        return () => {
            if (containerRef.current) containerRef.current.innerHTML = "";
        };
    }, [notes_list]);
    return <div ref={containerRef}></div>;
}
