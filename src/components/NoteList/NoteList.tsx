import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "../services/noteService";
import { Note } from "../types/note";
import css from "./NoteList.module.css";

const NoteList = () => {
  const queryClient = useQueryClient();

  // Получение заметок
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery<Note[]>(["notes"], () => fetchNotes());

  // Мутация удаления заметки
  const deleteMutation = useMutation((id: string) => deleteNote(id), {
    onSuccess: () => {
      // Перезапросить список заметок после удаления
      queryClient.invalidateQueries(["notes"]);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  // Если нет заметок — ничего не рендерим
  if (!notes || notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => deleteMutation.mutate(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
