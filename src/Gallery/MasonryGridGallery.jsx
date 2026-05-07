import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { translations } from '../translations';
import { ALL_PHOTOS } from '../photos';

export function FullGallery({ lang }) {
    const [selectedYear, setSelectedYear] = useState('All');
    const [currentIndex, setCurrentIndex] = useState(null);
    const t = translations[lang];
    const years = ['All', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];
    const filteredPhotos = selectedYear === 'All' ? ALL_PHOTOS : ALL_PHOTOS.filter(photo => photo.year === selectedYear);
    const showNext = (e) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length); };
    const showPrev = (e) => { e?.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length); };
    const selectedImg = currentIndex !== null ? filteredPhotos[currentIndex] : null;

    return (
        <div className="portfolio-app gallery-page-wrapper">
            <header className="archive-header">
                <h1>{t.fullGallery} {selectedYear !== 'All' ? `(${selectedYear})` : ''}</h1>
                <div className="filter-bar">
                    {years.map(year => (
                        <button key={year} className={selectedYear === year ? 'active' : ''} onClick={() => { setSelectedYear(year); setCurrentIndex(null); }}>{year}</button>
                    ))}
                </div>
                <Link to="/" className="cta-btn" style={{marginTop: '30px'}}>{t.back}</Link>
            </header>
            <div className="masonry-grid">
                {filteredPhotos.map((img, index) => (
                    <div key={img.id} className="masonry-item" onClick={() => setCurrentIndex(index)}>
                        <img src={img.url} alt={img.title} loading="lazy" />
                        <div className="item-hover-overlay">
                            <div className="overlay-content"><h2 className="overlay-type">{img.type}</h2><p className="overlay-year">{img.year}</p></div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedImg && (
                <div className="lightbox" onClick={() => setCurrentIndex(null)}>
                    <button className="close-btn" onClick={() => setCurrentIndex(null)}>×</button>
                    <button className="nav-arrow left" onClick={showPrev}>❮</button>
                    <div className="lightbox-center" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImg.url} alt={selectedImg.title} className="lightbox-img" />
                        <div className="lightbox-caption"><h3>{selectedImg.title}</h3><p>{selectedImg.year} - {selectedImg.type}</p></div>
                    </div>
                    <button className="nav-arrow right" onClick={showNext}>❯</button>
                </div>
            )}
        </div>
    );
}