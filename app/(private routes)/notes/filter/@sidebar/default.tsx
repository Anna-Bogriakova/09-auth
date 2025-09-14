
import SidebarNotes from "./SidebarNotes";
import { fetchServerTags } from "@/lib/api/serverApi";

export default async function DefaultSidebar() {
  const tags = await fetchServerTags(); 

  return <SidebarNotes tags={tags} />;
}
