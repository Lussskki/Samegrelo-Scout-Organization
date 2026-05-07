import { useState } from 'react';

export function AdminUpload({ lang }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [year, setYear] = useState(new Date().getFullYear().toString());
    const [type, setType] = useState("photo");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState("");

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPassword("");
        } else {
            alert(lang === 'ka' ? "პაროლი არასწორია!" : "Incorrect password!");
            setPassword("");
        }
    };

    const handleUpload = async () => {
        if (!file) return alert(lang === 'ka' ? "აირჩიეთ ფაილი!" : "Select a file!");
        if (!title) return alert(lang === 'ka' ? "დაამატეთ სათაური!" : "Add a title!");
        
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.url) {
                setUrl(data.url);
                const photoData = {
                    id: Date.now(),
                    url: data.url,
                    title: title,
                    year: year,
                    type: type
                };
                console.log("New photo data to add to photos.jsx:", photoData);
                alert(lang === 'ka' ? "ფოტო წარმატებით ატვირთვა!" : "Photo uploaded successfully!");
                setFile(null);
                setTitle("");
                setType("photo");
            }
        } catch (err) {
            console.error(err);
            alert(lang === 'ka' ? "ატვირთვა ვერ მოხერხდა" : "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
                <h2>{lang === 'ka' ? "ადმინ პანელი" : "Admin Panel"}</h2>
                <form onSubmit={handleLogin} style={{ marginTop: '30px' }}>
                    <input
                        type="password"
                        placeholder={lang === 'ka' ? "პაროლი" : "Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px',
                            marginBottom: '20px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem'
                        }}
                    />
                    <button type="submit" className="cta-btn" style={{ width: '100%' }}>
                        {lang === 'ka' ? "შესვლა" : "Login"}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '100px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2>{lang === 'ka' ? "ფოტოს ატვირთვა" : "Upload New Photo"}</h2>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    {lang === 'ka' ? "გამოსვლა" : "Logout"}
                </button>
            </div>

            <form style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        {lang === 'ka' ? "სათაური" : "Title"}
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={lang === 'ka' ? "ფოტოს სათაური" : "Photo title"}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        {lang === 'ka' ? "წელი" : "Year"}
                    </label>
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                    >
                        {years.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        {lang === 'ka' ? "ტიპი" : "Type"}
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            boxSizing: 'border-box'
                        }}
                    >
                        <option value="photo">Photo</option>
                        <option value="event">Event</option>
                        <option value="training">Training</option>
                        <option value="ceremony">Ceremony</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        {lang === 'ka' ? "ფოტო" : "Photo"}
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>

                <button type="button" className="cta-btn" onClick={handleUpload} disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
                    {loading ? (lang === 'ka' ? "მუშავდება..." : "Processing...") : (lang === 'ka' ? "ატვირთვა" : "Upload to Cloudinary")}
                </button>
            </form>

            {url && (
                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
                    <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                        {lang === 'ka' ? "ფოტო წარმატებით ატვირთვა!" : "Photo uploaded successfully!"}
                    </p>
                    <p style={{ marginBottom: '5px' }}>{lang === 'ka' ? "ბმული:" : "Link:"}</p>
                    <a href={url} target="_blank" rel="noreferrer" style={{ wordBreak: 'break-all', color: '#2e7d32' }}>
                        {url}
                    </a>
                    <p style={{ marginTop: '15px', fontSize: '0.9rem', fontStyle: 'italic' }}>
                        {lang === 'ka' 
                            ? `დაამატეთ ეს ფოტო photos.jsx ფაილში ამ მონაცემით:\n{\n  id: ${Date.now()},\n  url: "${url}",\n  title: "${title}",\n  year: "${year}",\n  type: "${type}"\n}`
                            : `Add this photo to photos.jsx with this data:\n{\n  id: ${Date.now()},\n  url: "${url}",\n  title: "${title}",\n  year: "${year}",\n  type: "${type}"\n}`
                        }
                    </p>
                </div>
            )}
        </div>
    );
}