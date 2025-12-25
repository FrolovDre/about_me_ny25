'use client';

import Image from 'next/image';
import { useState } from 'react';
import Icon from '../components/Icon';
import PortfolioPanel from '../components/PortfolioPanel';
import { profiles, type Language } from '../data/profile';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('ru');
  const profile = profiles[language];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#071632] via-[#0a2343] to-[#071632] text-snow">
      <div className="bg-halo bg-halo-right" aria-hidden="true" />
      <div className="bg-halo bg-halo-left" aria-hidden="true" />
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <div className="bg-grain" aria-hidden="true" />

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-14 lg:flex-row lg:items-start lg:gap-12">
        <section
          className="relative flex w-full animate-fade-slide flex-col items-start gap-6 lg:w-1/2"
          data-snow-mask="true"
        >
          <div className="flex w-full items-start justify-between gap-4">
            <div className="relative">
              <div className="profile-photo-frame">
                <Image
                  src="/profile.jpg"
                  alt={language === 'ru' ? 'Фото профиля' : 'Profile photo'}
                  width={220}
                  height={220}
                  className="profile-photo relative z-10 rounded-3xl border border-white/20"
                  priority
                />
              </div>
              <span className="profile-badge">Open to work · Product</span>
            </div>
            <div className="language-switch">
              <button
                type="button"
                className={`language-pill ${language === 'ru' ? 'language-pill-active' : ''}`}
                onClick={() => setLanguage('ru')}
              >
                RU
              </button>
              <button
                type="button"
                className={`language-pill ${language === 'en' ? 'language-pill-active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                ENG
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl" data-snow="true">
              {profile.name}
            </h1>
            <p className="text-xl text-white/80">{profile.role}</p>
            <div className="space-y-2 text-white/70">
              {profile.summary.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="rounded-2xl border border-sky-200/15 bg-sky-900/20 p-4 text-sm text-white/80">
              <p className="mb-1 text-white/60">{profile.lookingForLabel}</p>
              <p>{profile.lookingFor}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-white/80">
            <div className="flex items-center gap-2">
              <Icon name="pin" className="icon-soft" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="mail" className="icon-soft" />
              <a
                href={`mailto:${profile.email}`}
                className="link-highlight"
              >
                {profile.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="globe" className="icon-soft" />
              <a
                href={profile.github}
                className="link-highlight"
                target="_blank"
                rel="noreferrer"
              >
                {profile.github}
              </a>
            </div>
          </div>
          <a
            href={profile.cta.href}
            className="cta"
            data-snow="true"
          >
            {profile.cta.label}
          </a>
        </section>

        <section
          className="w-full lg:w-1/2 lg:sticky lg:top-14 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2"
          data-snow-mask="true"
        >
          <PortfolioPanel profile={profile} />
        </section>
      </div>
    </main>
  );
}
