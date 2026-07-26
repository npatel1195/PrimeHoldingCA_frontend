import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiArrowSmRight } from 'react-icons/hi';
import API from '../api/axios';
import { sampleProjects } from '../data/projects.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    API.get('/projects')
      .then((r) => setProjects(r.data || []))
      .catch(() => setProjects([]));
  }, []);

  // Combine sample (static) projects with admin-uploaded ones.
  // Admin-uploaded ones show only if /api/projects returned any.
  const combined = useMemo(() => {
    return [...sampleProjects, ...projects];
  }, [projects]);

  const filtered =
    tab === 'all'
      ? combined
      : combined.filter((p) => {
          // sampleProjects use divisionTone ('blue'/'green') and division label
          // admin projects use division ('cleaning'/'building')
          if (p.divisionTone) {
            if (tab === 'cleaning') return p.divisionTone === 'blue';
            if (tab === 'building') return p.divisionTone === 'green';
          }
          return p.division === tab;
        });

  return (
    <>
      <Helmet>
        <title>Our Projects | Prime Group Holding Inc. — Regina, SK</title>
        <meta
          name="description"
          content="See the before &amp; after of recent Regina cleaning and building projects delivered by Prime Group Holding Inc."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-green-dark text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_55%)]" />
        <div className="container-x relative py-20">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
            Recent Work
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Our Projects</h1>
          <p className="mt-3 max-w-3xl text-white/90">
            Real work delivered across Regina and surrounding areas — from post-construction
            turnover to full kitchen renovations. Browse the before &amp; after.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container-x py-6">
          <div className="flex flex-wrap gap-2">
            {[
              { k: 'all', l: 'All Projects' },
              { k: 'cleaning', l: 'Prime Cleaning' },
              { k: 'building', l: 'Building & Home Supply' },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTab(t.k)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === t.k
                    ? 'bg-brand-blue text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="section bg-gray-50">
        <div className="container-x">
          {filtered.length === 0 ? (
            <p className="rounded-xl bg-white p-10 text-center text-gray-500 shadow-sm">
              No projects in this category yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <article
                  key={p._id || `${p.title}-${i}`}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  {/* Before / After image pair */}
                  {p.before && p.after ? (
                    <div className="relative grid grid-cols-2">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={p.before}
                          alt={`${p.title} — before`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          Before
                        </span>
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={p.after}
                          alt={`${p.title} — after`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute right-2 top-2 rounded bg-brand-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                          After
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video w-full bg-gradient-to-br from-brand-blue to-brand-green" />
                  )}

                  <div className="p-5">
                    {p.division && (
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                          (p.divisionTone === 'green' || p.division === 'building')
                            ? 'bg-brand-green/10 text-brand-green'
                            : 'bg-brand-blue/10 text-brand-blue'
                        }`}
                      >
                        {p.division}
                      </span>
                    )}
                    <h3 className="mt-2 text-lg font-extrabold text-brand-blue-dark">{p.title}</h3>
                    {p.location && (
                      <p className="mt-1 text-xs text-gray-500">📍 {p.location}</p>
                    )}
                    {p.description && (
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">{p.description}</p>
                    )}
                    {p.outcome && (
                      <p className="mt-3 border-t border-gray-100 pt-3 text-xs font-semibold text-brand-green-dark">
                        ✓ {p.outcome}
                      </p>
                    )}
                    {!p.outcome && (
                      <Link
                        to="/quote"
                        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-blue-dark"
                      >
                        Request a Similar Project <HiArrowSmRight />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-r from-brand-blue to-brand-green text-white">
        <div className="container-x text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Tell us what you're working on — we'll quote supply-only, supply &amp; install, or a full
            cleaning package.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-semibold text-brand-blue-dark hover:bg-gray-100"
            >
              Get a Free Quote <HiArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-brand-blue-dark"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;