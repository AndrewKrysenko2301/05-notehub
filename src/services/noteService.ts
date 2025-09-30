import axios, { AxiosResponse } from "axios";
import { Note } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_API_TOKEN;

// Настройка axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Получение списка заметок с пагинацией и фильтром
export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response: AxiosResponse<{ notes: Note[]; totalPages: number }> =
    await api.get("", {
      params: { page, perPage, search },
    });
  return response.data;
};

// Создание новой заметки
export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("", note);
  return response.data;
};

// Удаление заметки по ID
export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await api.delete(
    `/${id}`
  );
  return response.data;
};
