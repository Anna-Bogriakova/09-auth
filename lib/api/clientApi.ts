import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

export const fetchNotes = async (
  tag: string = "",
  page: number,
  perPage: number = 12,
  search: string = ""
): Promise<NotesResponse> => {
  const queryParams: { page: number; perPage: number; tag?: string; search?: string } = { page, perPage };
  if (tag && tag !== "All") queryParams.tag = tag;
  if (search) queryParams.search = search;

  const response = await nextServer.get<NotesResponse>("/notes", {
    params: queryParams,
  });

  return response.data;
};

export const createNote = async (note: Pick<Note, "title" | "content" | "tag">): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", note, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

export const fetchTags = async (): Promise<string[]> => {

  const { data } = await nextServer.get<NotesResponse>('/notes', {
    params: { page: 1, perPage: 100 },
  });

  const tagsSet = new Set<string>();
  data.notes.forEach((note) => {
    if (note.tag) tagsSet.add(note.tag);
  });

  return ['All', ...Array.from(tagsSet)];
};

export type AuthRequest  = {
  email: string;
  password: string;
};

export const register = async (data:AuthRequest  ):Promise<User> => {
    const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
}
export const login = async (data:AuthRequest  ):Promise<User> => {
    const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}
export const logout = async ():Promise<void> => {
    await nextServer.post("/auth/logout");
}
type CheckSession = {
  success: boolean,
}
  
export const checkSession = async () => {
  const res = await nextServer.get<CheckSession>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me")
  return data;
}
export type UpdateUserRequest = {
  username?: string;
  avatar?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};