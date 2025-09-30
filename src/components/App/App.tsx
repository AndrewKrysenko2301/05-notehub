import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import NoteList from "../NoteList/NoteList";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "../services/noteService";
import { Note } from "../types/note";

const PER_PAGE = 12;

function App() {
  // Состояние модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Состояние текущей страницы (0-based для React Paginate)
  const [page, setPage] = useState(0);

  // Состояние для поиска
  const [searchTerm, setSearchTerm] = useState("");

  // Запрос заметок с сервера с поддержкой пагинации и поиска
  const { data, isLoading, error } = useQuery(["notes", page, searchTerm], () =>
    fetchNotes(page + 1, PER_PAGE, searchTerm)
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Поиск */}
        <SearchBox value={searchTerm} onChange={setSearchTerm} />

        {/* Пагинация */}
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        {/* Кнопка создания новой заметки */}
        <button onClick={openModal}>Создать заметку</button>
      </header>

      {/* Список заметок */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Ошибка загрузки заметок</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {/* Модальное окно для NoteForm */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
