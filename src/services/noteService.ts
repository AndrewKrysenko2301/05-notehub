import axios from "axios";
import type { AxiosResponse } from "axios";

import type { Note } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = import.meta.env.VITE_API_TOKEN;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search?: string
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response: AxiosResponse<{ notes: Note[]; totalPages: number }> =
    await api.get("", { params: { page, perPage, search } });
  return response.data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post("", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
