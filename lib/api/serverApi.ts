import { cookies } from 'next/headers';
import { nextServer } from "./api";
import { User } from "@/types/user";
import { Note } from '@/types/note';

export const checkServerSession = async () => {
    const cookieStore = await cookies();
    const res = await nextServer.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        }
    })
    return res;

}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};


export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  perPage?: number;
}

export const fetchServerTags = async (): Promise<string[]> => {
  const cookieStore = cookies();

  const { data } = await nextServer.get<NotesResponse>('/notes', {
    headers: {
      Cookie: cookieStore.toString(),
    },
    params: { page: 1, perPage: 100 },
  });

  const tagsSet = new Set<string>();
  data.notes.forEach((note) => {
    if (note.tag) tagsSet.add(note.tag);
  });


  return ['All', ...Array.from(tagsSet)];
};