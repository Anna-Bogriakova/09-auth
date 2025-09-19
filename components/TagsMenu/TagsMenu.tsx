"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./TagsMenu.module.css";
import { useState } from "react";

export default function TagsMenu() {
  const pathname = usePathname();
  const currentTag = pathname?.split("/")[3] || "All";

  const [open, setOpen] = useState(false);

  const tags: string[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentTag === "All" ? "Notes ▾" : `${currentTag} ▾`}
      </button>

      {open && (
        <ul className={css.menuList}>
          <li
            className={`${css.menuItem} ${
              currentTag === "All" ? css.menuItemActive : ""
            }`}
          >
            <Link
              href="/notes"
              className={css.menuLink}
              onClick={() => setOpen(false)}
            >
              All
            </Link>
          </li>

          {tags.map((tag) => (
            <li
              key={tag}
              className={`${css.menuItem} ${
                tag === currentTag ? css.menuItemActive : ""
              }`}
            >
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setOpen(false)}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
