import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes, FetchNotesResponse } from "@/lib/api/serverApi";
import { Metadata } from "next";
import { NoteTag } from "@/types/note"; // ✅ імпорт

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || "All";

  return {
    title: `Notes tagged with ${tag} | NoteHub`,
    description: `Browse notes filtered by ${tag} tag.`,
    openGraph: {
      title: `Notes tagged with ${tag} | NoteHub`,
      description: `Browse notes filtered by ${tag} tag.`,
      url: `/notes/filter/${tag}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}

export default async function NotesPage({
  params,
  searchParams,
}: NotesPageProps) {
  const { slug } = await params;
  const tag: NoteTag | undefined =
    slug[0] && slug[0] !== "All" ? (slug[0] as NoteTag) : undefined; // ✅ приведення

  const page = searchParams ? Number((await searchParams).page ?? 1) : 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<FetchNotesResponse>({
    queryKey: ["notes", page, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} initialPage={page} />
    </HydrationBoundary>
  );
}
