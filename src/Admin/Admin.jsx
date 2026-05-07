import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  buildTranslationDrafts,
  parseTranslationValue,
} from '../Content/siteContentSchema'
import {
  fetchSiteContent,
  loadSiteContent,
  saveSiteContent,
  uploadSiteImage,
} from '../Content/siteContent'
import './Admin.css'

const AUTH_KEY = 'samegrelo-admin-authenticated'
const ADMIN_ACCOUNT = {
  username: 'admin',
  password: '1234',
}

const sections = [
  { id: 'dashboard', label: 'მიმოხილვა' },
  { id: 'hero', label: 'მთავარი ბანერი' },
  { id: 'texts', label: 'საიტის ტექსტები' },
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

function createEmptyTextEntry() {
  return {
    key: '',
    ka: '',
    en: '',
  }
}

export function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(loadAdminSession)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [content, setContent] = useState(loadSiteContent)
  const [translationDrafts, setTranslationDrafts] = useState(() => buildTranslationDrafts(loadSiteContent().translations))
  const [newEntry, setNewEntry] = useState(createEmptyTextEntry)
  const [status, setStatus] = useState('')
  const [textFilter, setTextFilter] = useState('')
  const [isLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [uploadingPhotoId, setUploadingPhotoId] = useState(null)

  useEffect(() => {
    setStatus('MongoDB-დან განახლებული კონტენტი იტვირთება...')
    fetchSiteContent({ fallbackToDefault: false })
      .then((nextContent) => {
        setContent(nextContent)
        setTranslationDrafts(buildTranslationDrafts(nextContent.translations))
        setStatus('')
      })
      .catch((error) => {
        setStatus(`მონაცემთა ბაზასთან კავშირი ვერ მოხერხდა: ${error.message}`)
      })
  }, [])

  const galleryCount = content.gallery.filter((photo) => photo.src).length

  const textKeys = useMemo(() => {
    const keys = new Set([
      ...Object.keys(content.translations.ka ?? {}),
      ...Object.keys(content.translations.en ?? {}),
    ])

    return [...keys]
      .filter((key) => key.toLowerCase().includes(textFilter.trim().toLowerCase()))
      .sort((left, right) => left.localeCompare(right))
  }, [content.translations, textFilter])

  const jsonPreview = useMemo(() => JSON.stringify(content, null, 2), [content])

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

  const setTimedStatus = (message) => {
    setStatus(message)
    window.setTimeout(() => setStatus(''), 2200)
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

  const uploadPhoto = async (id, file) => {
    if (!file) {
      return
    }

    try {
      setUploadingPhotoId(id)
      const { src } = await uploadSiteImage(file)
      updatePhoto(id, 'src', src)
      setTimedStatus('ფოტო აიტვირთა, შესანახად დააჭირე შენახვას')
    } catch (error) {
      setTimedStatus(`ფოტოს ატვირთვა ვერ შესრულდა: ${error.message}`)
    } finally {
      setUploadingPhotoId(null)
    }
  }

  const updateDraft = (lang, key, value) => {
    setTranslationDrafts((current) => ({
      ...current,
      [`${lang}:${key}`]: value,
    }))
  }

  const addTextEntry = () => {
    const normalizedKey = newEntry.key.trim()

    if (!normalizedKey) {
      setTimedStatus('ახალი ტექსტისთვის key მიუთითე')
      return
    }

    if (content.translations.ka[normalizedKey] !== undefined || content.translations.en[normalizedKey] !== undefined) {
      setTimedStatus('ასეთი key უკვე არსებობს')
      return
    }

    setContent((current) => ({
      ...current,
      translations: {
        ka: {
          ...current.translations.ka,
          [normalizedKey]: '',
        },
        en: {
          ...current.translations.en,
          [normalizedKey]: '',
        },
      },
    }))

    setTranslationDrafts((current) => ({
      ...current,
      [`ka:${normalizedKey}`]: newEntry.ka,
      [`en:${normalizedKey}`]: newEntry.en,
    }))

    setNewEntry(createEmptyTextEntry())
    setTimedStatus('ახალი ტექსტი დაემატა')
  }

  const removeTextEntry = (key) => {
    setContent((current) => {
      const nextKa = { ...current.translations.ka }
      const nextEn = { ...current.translations.en }
      delete nextKa[key]
      delete nextEn[key]

      return {
        ...current,
        translations: {
          ka: nextKa,
          en: nextEn,
        },
      }
    })

    setTranslationDrafts((current) => {
      const nextDrafts = { ...current }
      delete nextDrafts[`ka:${key}`]
      delete nextDrafts[`en:${key}`]
      return nextDrafts
    })

    setTimedStatus('ტექსტი წაიშალა')
  }

  const buildContentForSave = () => {
    const nextKa = {}
    const nextEn = {}
    const allKeys = new Set([
      ...Object.keys(content.translations.ka ?? {}),
      ...Object.keys(content.translations.en ?? {}),
    ])

    for (const key of allKeys) {
      nextKa[key] = parseTranslationValue(
        translationDrafts[`ka:${key}`] ?? '',
        content.translations.ka[key],
      )
      nextEn[key] = parseTranslationValue(
        translationDrafts[`en:${key}`] ?? '',
        content.translations.en[key],
      )
    }

    return {
      ...content,
      translations: {
        ka: nextKa,
        en: nextEn,
      },
    }
  }

  const persistContent = async () => {
    try {
      setIsSaving(true)
      const nextContent = buildContentForSave()
      const savedContent = await saveSiteContent(nextContent)
      setContent(savedContent)
      setTranslationDrafts(buildTranslationDrafts(savedContent.translations))
      setTimedStatus('მონაცემები შენახულია')
    } catch (error) {
      setTimedStatus(`შენახვა ვერ შესრულდა: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = async () => {
    try {
      setIsSaving(true)
      const refreshedContent = await fetchSiteContent()
      setContent(refreshedContent)
      setTranslationDrafts(buildTranslationDrafts(refreshedContent.translations))
      setTimedStatus('მონაცემები ბაზიდან განახლდა')
    } catch (error) {
      setTimedStatus(`განახლება ვერ შესრულდა: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
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
            <p>ადმინის სივრცე</p>
            <h1>საიტის მართვა</h1>
          </div>
          <div className="admin-actions">
            {status && <span className="admin-status">{status}</span>}
            <button className="admin-secondary" type="button" onClick={handleLogout}>
              გამოსვლა
            </button>
            <button className="admin-secondary" type="button" onClick={handleReset} disabled={isSaving}>
              განახლება
            </button>
            <button className="admin-primary" type="button" onClick={persistContent} disabled={isSaving}>
              {isSaving ? 'ინახება...' : 'შენახვა'}
            </button>
          </div>
        </header>

        {isLoading && (
          <section className="admin-section">
            <div className="admin-card">
              <h2>იტვირთება</h2>
              <p>MongoDB-დან კონტენტი იტვირთება...</p>
            </div>
          </section>
        )}

        {!isLoading && activeSection === 'dashboard' && (
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
                <span>ტექსტები</span>
                <strong>{textKeys.length} key</strong>
              </article>
            </div>

            <div className="admin-card">
              <h2>როგორ მუშაობს</h2>
              <p>
                ახლა ტექსტები, კონტაქტი, დონაცია და გალერეა MongoDB-ში ინახება.
                ტექსტების სექციაში შეგიძლია ახალი key დაამატო, არსებულები შეცვალო ან წაშალო,
                მერე კი ერთი ღილაკით შეინახო ყველაფერი.
              </p>
            </div>
          </section>
        )}

        {!isLoading && activeSection === 'hero' && (
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

        {!isLoading && activeSection === 'texts' && (
          <section className="admin-section">
            <div className="admin-card">
              <div className="admin-card-header">
                <h2>საიტის ტექსტები</h2>
                <input
                  className="admin-inline-input"
                  value={textFilter}
                  onChange={(event) => setTextFilter(event.target.value)}
                  placeholder="ძებნა key-ით"
                />
              </div>

              <div className="admin-add-text">
                <label>
                  ახალი key
                  <input
                    value={newEntry.key}
                    onChange={(event) => setNewEntry((current) => ({ ...current, key: event.target.value }))}
                    placeholder="exampleKey"
                  />
                </label>
                <label>
                  ქართული
                  <textarea
                    rows="2"
                    value={newEntry.ka}
                    onChange={(event) => setNewEntry((current) => ({ ...current, ka: event.target.value }))}
                  />
                </label>
                <label>
                  English
                  <textarea
                    rows="2"
                    value={newEntry.en}
                    onChange={(event) => setNewEntry((current) => ({ ...current, en: event.target.value }))}
                  />
                </label>
                <button className="admin-secondary" type="button" onClick={addTextEntry}>
                  ტექსტის დამატება
                </button>
              </div>

              {textKeys.length === 0 && (
                <p className="admin-empty">ამ ფილტრით ტექსტი ვერ მოიძებნა.</p>
              )}

              <div className="admin-text-list">
                {textKeys.map((key) => (
                  <article className="admin-text-editor" key={key}>
                    <div className="admin-text-head">
                      <strong>{key}</strong>
                      <button className="admin-danger" type="button" onClick={() => removeTextEntry(key)}>
                        წაშლა
                      </button>
                    </div>
                    <div className="admin-two-col">
                      <label>
                        ქართული
                        <textarea
                          rows="5"
                          value={translationDrafts[`ka:${key}`] ?? ''}
                          onChange={(event) => updateDraft('ka', key, event.target.value)}
                        />
                      </label>
                      <label>
                        English
                        <textarea
                          rows="5"
                          value={translationDrafts[`en:${key}`] ?? ''}
                          onChange={(event) => updateDraft('en', key, event.target.value)}
                        />
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {!isLoading && activeSection === 'gallery' && (
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
                        ფოტო ფაილიდან
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/gif"
                          onChange={(event) => {
                            uploadPhoto(photo.id, event.target.files?.[0])
                            event.target.value = ''
                          }}
                        />
                      </label>
                      {uploadingPhotoId === photo.id && (
                        <p className="admin-upload-status">ფოტო იტვირთება...</p>
                      )}
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

        {!isLoading && activeSection === 'donation' && (
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

        {!isLoading && activeSection === 'contact' && (
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

        {!isLoading && activeSection === 'data' && (
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
