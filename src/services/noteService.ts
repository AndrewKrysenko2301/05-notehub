import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, CreateNoteDto } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";

// Получение заметок с сервера
export const fetchNotes = async (
  page: number,
  perPage: number,
  search = ""
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response: AxiosResponse<{ notes: Note[]; totalPages: number }> =
    await axios.get(`${API_URL}/notes`, {
      params: { page, perPage, search },
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    });
  return response.data;
};

// Создание новой заметки
export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(
    `${API_URL}/notes`,
    note,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    }
  );
  return response.data;
};

// Удаление заметки
export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await axios.delete(
    `${API_URL}/notes/${id}`,
    {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}` },
    }
  );
  return response.data;
};
