import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultSiteContent, loadSiteContent, saveSiteContent } from '../siteContent'
import './Admin.css'

const AUTH_KEY = 'samegrelo-admin-authenticated'
const ADMIN_ACCOUNT = {
  username: 'admin',
  password: '1234',
}

const sections = [
  { id: 'dashboard', label: 'მიმოხილვა' },
  { id: 'hero', label: 'მთავარი ბანერი' },
  { id: 'gallery', label: 'გალერეა' },
  { id: 'donation', label: 'დონაცია' },
  { id: 'contact', label: 'კონტაქტი' },
  { id: 'data', label: 'მონაცემები' },
]

function loadAdminSession() {
  try {
    return sessionStorage.getItem(AUTH_KEY) === 'true'
  } catch {
    return false
  }
}

function emptyPhoto() {
  return {
    id: Date.now(),
    alt: '',
    year: new Date().getFullYear().toString(),
    type: 'Photo',
    src: '',
  }
}

export function Admin() {
  const didMount = useRef(false)
  const [isAuthenticated, setIsAuthenticated] = useState(loadAdminSession)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [content, setContent] = useState(loadSiteContent)
  const [status, setStatus] = useState('')

  const galleryCount = content.gallery.filter((photo) => photo.src).length

  const jsonPreview = useMemo(() => JSON.stringify(content, null, 2), [content])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    saveSiteContent(content)
    setStatus('ავტომატურად შენახულია')
    const statusTimer = window.setTimeout(() => setStatus(''), 1200)

    return () => window.clearTimeout(statusTimer)
  }, [content])

  const handleLogin = (event) => {
    event.preventDefault()

    if (
      loginForm.username === ADMIN_ACCOUNT.username &&
      loginForm.password === ADMIN_ACCOUNT.password
    ) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAuthenticated(true)
      setLoginError('')
      setLoginForm({ username: '', password: '' })
      return
    }

    setLoginError('მომხმარებელი ან პაროლი არასწორია')
  }

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
  }

  const updateGroup = (group, field, value) => {
    setContent((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [field]: value,
      },
    }))
  }

  const updatePhoto = (id, field, value) => {
    setContent((current) => ({
      ...current,
      gallery: current.gallery.map((photo) =>
        photo.id === id ? { ...photo, [field]: value } : photo,
      ),
    }))
  }

  const addPhoto = () => {
    setContent((current) => ({
      ...current,
      gallery: [emptyPhoto(), ...current.gallery],
    }))
  }

  const removePhoto = (id) => {
    setContent((current) => ({
      ...current,
      gallery: current.gallery.filter((photo) => photo.id !== id),
    }))
  }

  const saveContent = () => {
    saveSiteContent(content)
    setStatus('შენახულია')
    window.setTimeout(() => setStatus(''), 1800)
  }

  const resetContent = () => {
    setContent(defaultSiteContent)
    setStatus('გასუფთავდა')
    window.setTimeout(() => setStatus(''), 1800)
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <div className="admin-login-brand">
            <span className="admin-brand-mark">S</span>
            <div>
              <strong>Samegrelo Scouts</strong>
              <span>Admin Login</span>
            </div>
          </div>

          <label>
            მომხმარებელი
            <input
              autoComplete="username"
              value={loginForm.username}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, username: event.target.value }))
              }
              placeholder="admin"
            />
          </label>

          <label>
            პაროლი
            <input
              autoComplete="current-password"
              type="password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="1234"
            />
          </label>

          {loginError && <p className="admin-login-error">{loginError}</p>}

          <button className="admin-primary" type="submit">
            შესვლა
          </button>

          <Link className="admin-login-back" to="/">
            საიტზე დაბრუნება
          </Link>
        </form>
      </main>
    )
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="admin-brand">
          <span className="admin-brand-mark">S</span>
          <div>
            <strong>Samegrelo Scouts</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-nav">
          {sections.map((section) => (
            <button
              key={section.id}
              className={activeSection === section.id ? 'active' : ''}
              type="button"
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>

        <Link className="admin-site-link" to="/">
          საიტზე დაბრუნება
        </Link>
      </aside>

      <div className="admin-workspace">
        <header className="admin-header">
          <div>
            <p>ადმინის როუტი</p>
            <h1>საიტის მართვა</h1>
          </div>
          <div className="admin-actions">
            {status && <span className="admin-status">{status}</span>}
            <button className="admin-secondary" type="button" onClick={handleLogout}>
              გამოსვლა
            </button>
            <button className="admin-secondary" type="button" onClick={resetContent}>
              გასუფთავება
            </button>
            <button className="admin-primary" type="button" onClick={saveContent}>
              შენახვა
            </button>
          </div>
        </header>

        {activeSection === 'dashboard' && (
          <section className="admin-section">
            <div className="admin-grid">
              <article className="admin-stat">
                <span>Hero</span>
                <strong>{content.hero.text || 'ცარიელია'}</strong>
              </article>
              <article className="admin-stat">
                <span>გალერეა</span>
                <strong>{galleryCount} ფოტო</strong>
              </article>
              <article className="admin-stat">
                <span>კონტაქტი</span>
                <strong>{content.contact.email}</strong>
              </article>
            </div>

            <div className="admin-card">
              <h2>როგორ მუშაობს</h2>
              <p>
                შეავსე ველები, დააჭირე შენახვას და დაბრუნდი საიტზე. ამ ეტაპზე ცვლილებები ინახება
                ბრაუზერის localStorage-ში, ამიტომ შეგიძლია ტექსტები და გალერეის ბმულები კოდის
                გახსნის გარეშე მართო.
              </p>
            </div>
          </section>
        )}

        {activeSection === 'hero' && (
          <section className="admin-section">
            <div className="admin-card">
              <h2>მთავარი ბანერი</h2>
              <label>
                ზედა ტექსტი
                <input
                  value={content.hero.text}
                  onChange={(event) => updateGroup('hero', 'text', event.target.value)}
                />
              </label>
              <label>
                სათაური
                <textarea
                  rows="3"
                  value={content.hero.title}
                  onChange={(event) => updateGroup('hero', 'title', event.target.value)}
                />
              </label>
              <label>
                ღილაკი
                <input
                  value={content.hero.button}
                  onChange={(event) => updateGroup('hero', 'button', event.target.value)}
                />
              </label>
            </div>
          </section>
        )}

        {activeSection === 'gallery' && (
          <section className="admin-section">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>გალერეა</h2>
                <button className="admin-secondary" type="button" onClick={addPhoto}>
                  ფოტოს დამატება
                </button>
              </div>

              {content.gallery.length === 0 && (
                <p className="admin-empty">ჯერ ფოტო არ არის დამატებული.</p>
              )}

              <div className="admin-photo-list">
                {content.gallery.map((photo) => (
                  <article className="admin-photo-editor" key={photo.id}>
                    <div className="admin-photo-preview">
                      {photo.src ? <img src={photo.src} alt={photo.alt || 'Photo'} /> : <span>Preview</span>}
                    </div>
                    <div className="admin-photo-fields">
                      <label>
                        ფოტო URL
                        <input
                          value={photo.src}
                          onChange={(event) => updatePhoto(photo.id, 'src', event.target.value)}
                        />
                      </label>
                      <label>
                        სათაური
                        <input
                          value={photo.alt}
                          onChange={(event) => updatePhoto(photo.id, 'alt', event.target.value)}
                        />
                      </label>
                      <div className="admin-two-col">
                        <label>
                          წელი
                          <input
                            value={photo.year}
                            onChange={(event) => updatePhoto(photo.id, 'year', event.target.value)}
                          />
                        </label>
                        <label>
                          ტიპი
                          <input
                            value={photo.type}
                            onChange={(event) => updatePhoto(photo.id, 'type', event.target.value)}
                          />
                        </label>
                      </div>
                      <button className="admin-danger" type="button" onClick={() => removePhoto(photo.id)}>
                        წაშლა
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'donation' && (
          <section className="admin-section">
            <div className="admin-card">
              <h2>დონაცია</h2>
              <label>
                IBAN
                <input
                  value={content.donation.iban}
                  onChange={(event) => updateGroup('donation', 'iban', event.target.value)}
                />
              </label>
              <label>
                ტექსტი
                <textarea
                  rows="4"
                  value={content.donation.text}
                  onChange={(event) => updateGroup('donation', 'text', event.target.value)}
                />
              </label>
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="admin-section">
            <div className="admin-card">
              <h2>კონტაქტი</h2>
              <label>
                ტელეფონი
                <input
                  value={content.contact.phone}
                  onChange={(event) => updateGroup('contact', 'phone', event.target.value)}
                />
              </label>
              <label>
                ელფოსტა
                <input
                  value={content.contact.email}
                  onChange={(event) => updateGroup('contact', 'email', event.target.value)}
                />
              </label>
              <label>
                ვებგვერდი
                <input
                  value={content.contact.website}
                  onChange={(event) => updateGroup('contact', 'website', event.target.value)}
                />
              </label>
            </div>
          </section>
        )}

        {activeSection === 'data' && (
          <section className="admin-section">
            <div className="admin-card">
              <h2>მონაცემების ნახვა</h2>
              <textarea
                className="admin-json"
                value={jsonPreview}
                readOnly
                rows="18"
              />
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
