import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note, NoteTag } from "@/types/note";

// ✅ Перевірка сесії на сервері
export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("/auth/session", {
    headers: { Cookie: cookieStore.toString() },
  });
  return response; // тепер повертається весь AxiosResponse
};

// ✅ Отримання поточного користувача
export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

// ✅ Інтерфейси для нотаток
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalItems: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

// ✅ Отримати список нотаток
export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { page = 1, perPage = 12, search = "", tag } = params;
  const cookieStore = await cookies();

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
};

// ✅ Отримати нотатку по ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};

// ✅ Отримати всі теги нотаток
export const fetchServerTags = async (): Promise<NoteTag[]> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<NoteTag[]>("/tags", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
