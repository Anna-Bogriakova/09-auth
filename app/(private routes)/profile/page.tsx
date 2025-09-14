'use client'
import css from './ProfilePage.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
import { getMe } from '@/lib/api/clientApi';

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

 useEffect(() => {
    getMe()
      .then((data) => setUser(data))
  }, []);

  
    return <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      {user && (
  <Image
    src={user?.avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
    alt="User Avatar"
    width={120}
    height={120}
    className={css.avatar}
  />
)}

    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user?.username || 'Anonymous'}
      </p>
      <p>
        Email: {user?.email}
      </p>
    </div>
  </div>
</main>

}
