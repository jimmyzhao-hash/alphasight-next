'use client';

import Image from "next/image";
import { AuthWrapper } from './components/auth-wrapper';
import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { user, logout } = usePrivy() as { user: { email?: string | { emailAddress: string }, avatar?: { url: string } }, logout: () => void };

  const [projectInfo, setProjectInfo] = useState({
    name: '',
    websiteUrl: '',
    deckLink: '',
    xAccount: '',
    description: ''
  });

  // Updated email display logic with proper type handling
  const displayEmail = () => {
    if (!user) return 'Anonymous User';
    if (typeof user.email === 'string') return user.email;
    if (user.email && 'emailAddress' in user.email) {
      return user.email.emailAddress;
    }
    return 'Anonymous User';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Project Info:', projectInfo);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <AuthWrapper>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-2xl">
          {/* Account Info Section */}
          <div className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-3">
              {user?.avatar?.url && (
                <Image
                  src={user.avatar.url}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="text-sm font-medium">{displayEmail()}</p>
              </div>
            </div>
            <button
              onClick={() => logout?.()}
              className="text-sm px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          </div>

          {/* Project Form Section */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <h1 className="text-2xl font-bold text-center">Submit Your Project</h1>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={projectInfo.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  name="websiteUrl"
                  value={projectInfo.websiteUrl}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                  placeholder="https://"
                />
              </div>

              <div>
                <label htmlFor="deckLink" className="block text-sm font-medium mb-2">
                  Deck Link (Notion)
                </label>
                <input
                  type="url"
                  id="deckLink"
                  name="deckLink"
                  value={projectInfo.deckLink}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                  placeholder="https://notion.so/"
                />
              </div>

              <div>
                <label htmlFor="xAccount" className="block text-sm font-medium mb-2">
                  X (Twitter) Account
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="xAccount"
                    name="xAccount"
                    value={projectInfo.xAccount}
                    onChange={handleChange}
                    className="flex-1 p-3 rounded-r-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Project Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={projectInfo.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-12 px-5"
            >
              Submit Project
            </button>
          </form>
        </main>
      </div>
    </AuthWrapper>
  );
}
