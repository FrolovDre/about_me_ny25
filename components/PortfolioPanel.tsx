'use client';

import { useEffect, useState } from 'react';
import { profiles } from '../data/profile';
import Icon from './Icon';

type Profile = (typeof profiles)['ru'];
type TabId = keyof Profile['tabs'];

type PortfolioPanelProps = {
  profile: Profile;
};

export default function PortfolioPanel({ profile }: PortfolioPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('projects');
  const [activeProject, setActiveProject] = useState<Profile['projects'][number] | null>(
    null
  );

  useEffect(() => {
    if (!activeProject) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  return (
    <div className="relative rounded-3xl border border-sky-200/15 bg-gradient-to-br from-sky-900/40 via-blue-900/20 to-slate-900/10 p-6 shadow-frost backdrop-blur-xl">
      <div className="tabs-bar sticky top-0 z-10 -mx-6 flex flex-wrap gap-2 px-6 pb-3 pt-2">
        {(
          [
            { id: 'projects', icon: 'sparkles' },
            { id: 'experience', icon: 'briefcase' },
            { id: 'skills', icon: 'layers' },
            { id: 'education', icon: 'graduation' }
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`tab ${activeTab === tab.id ? 'tab-active' : ''}`}
            data-snow="true"
          >
            <Icon name={tab.icon} className="icon-soft" />
            {profile.tabs[tab.id]}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {activeTab === 'projects' && (
          <div className="space-y-5">
            {profile.projects.map((project, index) => {
              const preview = (
                <div className="space-y-2 text-white/70">
                  <p>
                    <span className="font-semibold text-white/90">
                      {profile.labels.problem}:
                    </span>{' '}
                    {project.problem}
                  </p>
                  <p>
                    <span className="font-semibold text-white/90">
                      {profile.labels.action}:
                    </span>{' '}
                    {project.action}
                  </p>
                  <p>
                    <span className="font-semibold text-white/90">
                      {profile.labels.result}:
                    </span>{' '}
                    {project.result}
                  </p>
                </div>
              );
              return (
                <article
                  key={project.title}
                  className="panel-card panel-card-project animate-fade-slide"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="status-pill">{project.status}</span>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Icon name="sparkles" className="icon-soft icon-lg" />
                    {project.title}
                  </div>
                  {preview}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="link-highlight text-left"
                    onClick={() => setActiveProject(project)}
                  >
                    {profile.labels.more}
                  </button>
                </article>
              );
            })}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-5">
            {profile.experience.map((job) => (
              <article
                key={`${job.company}-${job.period}`}
                className="panel-card"
              >
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Icon name="briefcase" className="icon-soft icon-lg" />
                  {job.role}
                </div>
                <p className="text-white/70">
                  {job.company} · {job.period}
                </p>
                <ul className="list-inside list-disc space-y-1 text-white/70">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-5">
            <div className="panel-card">
              <h3 className="text-base font-semibold text-white">
                {profile.labels.product}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.product.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel-card">
              <h3 className="text-base font-semibold text-white">
                {profile.labels.process}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.process.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel-card">
              <h3 className="text-base font-semibold text-white">
                {profile.labels.analytics}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.analytics.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="panel-card">
              <h3 className="text-base font-semibold text-white">
                {profile.labels.tools}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.skills.tools.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-5">
            {profile.education.map((item) => (
              <article key={item.title} className="panel-card">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Icon name="graduation" className="icon-soft icon-lg" />
                  {item.title}
                </div>
                <p className="text-white/70">{item.detail}</p>
                {item.period && (
                  <p className="text-sm text-white/60">{item.period}</p>
                )}
              </article>
            ))}
            <div className="panel-card">
              <h3 className="text-base font-semibold text-white">
                {profile.labels.languages}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {profile.languages.map((language) => (
                  <span key={language} className="tag">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {activeProject && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveProject(null)}
        >
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              aria-label="Close"
              onClick={() => setActiveProject(null)}
            >
              ×
            </button>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">
                  {profile.labels.projectsStatus}
                </p>
                <p className="text-base font-semibold text-white">
                  {activeProject.status}
                </p>
              </div>
              <div className="text-right text-white/70">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">
                  {profile.labels.result}
                </p>
                <p className="text-sm">{activeProject.result}</p>
              </div>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">
              {activeProject.title}
            </h3>
            <div className="mt-4 space-y-3 text-white/70">
              <p>
                <span className="font-semibold text-white/90">
                  {profile.labels.problem}:
                </span>{' '}
                {activeProject.problem}
              </p>
              <p>
                <span className="font-semibold text-white/90">
                  {profile.labels.action}:
                </span>{' '}
                {activeProject.action}
              </p>
              <p>{activeProject.details}</p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-sky-200/20 bg-sky-900/40 p-4 text-sm">
              <p className="text-white/70">
                {profile.labels.links ?? 'Links'}
              </p>
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="link-highlight"
                >
                  GitHub
                </a>
                <a href={`mailto:${profile.email}`} className="link-highlight">
                  {profile.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
