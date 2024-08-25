import { useEffect, useState } from 'react';
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";
import './index.css';
import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { notesCollection, db } from "./firebase";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState("");
  const [tempNoteText, setTempNoteText] = useState("");

  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0];

  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  // Fetch notes from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, snapshot => {
      const notesArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  // Set the current note ID to the first note when notes change
  useEffect(() => {
    if (notes.length > 0 && !currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes, currentNoteId]);

  // Update temporary note text when currentNote changes
  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  // Auto-save note after 500ms delay if text changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote && tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [tempNoteText, currentNote]);

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
    if (currentNoteId) {
      const docRef = doc(db, "notes", currentNoteId);
      await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true });
    }
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
    if (noteId === currentNoteId) {
      setCurrentNoteId(notes[0]?.id || "");
    }
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split
          sizes={[30, 70]}
          direction="horizontal"
          className="split"
        >
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button
            className="first-note"
            onClick={createNewNote}
          >
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
