import { Note, NoteTag } from "@/types/note";
import { nextServer } from "./api";
import type { RegisterRequest, User } from "@/types/user";

// Відповідь від бекенду при отриманні нотаток
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalItems: number;
}

// Параметри для запиту нотаток
export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | string;
}

// ✅ Аліас, якщо в інших файлах ти використовував NotesResponse
export type NotesResponse = FetchNotesResponse;

// ----------------- AUTH -----------------

export const register = async (data: RegisterRequest): Promise<User | null> => {
  try {
    const response = await nextServer.post<User>("/auth/register", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionResponse = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionResponse>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

// ----------------- USERS -----------------

export type UpdateUserRequest = {
  username?: string;
  email?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};

// ----------------- NOTES -----------------

export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = "", tag } = params;

  const { data } = await nextServer.get<FetchNotesResponse>("notes", {
    params: { page, perPage, search, tag },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`notes/${id}`);
  return data;
}

export async function createNote(
  noteData: Pick<Note, "title" | "content" | "tag">
): Promise<Note> {
  const { data } = await nextServer.post<Note>("notes", noteData);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`notes/${noteId}`);
  return data;
}

export async function updateNote(
  noteId: string,
  noteData: Pick<Note, "title" | "content" | "tag">
): Promise<Note> {
  const { data } = await nextServer.patch<Note>(`notes/${noteId}`, noteData);
  return data;
}
