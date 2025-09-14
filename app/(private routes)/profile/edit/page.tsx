'use client'
import Image from 'next/image'
import css from './EditProfilePage.module.css'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';

export default function EditProfile() {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then((user) => {
      setUserName(user.username ?? '');
      setEmail(user.email ?? '');
      setAvatar(user.avatar ?? '');
      setLoading(false);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateMe({ username: username });
      router.push('/profile');
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image 
          src={avatar || "https://ac.goit.global/fullstack/react/default-avatar.jpg"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input 
              id="username"
              type="text"
              value={username}
              onChange={handleChange}
              className={css.input}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
