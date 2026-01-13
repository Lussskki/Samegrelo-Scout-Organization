import { useState } from 'react';

const GalleryManager = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [lastUrl, setLastUrl] = useState("");

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Select a file first!");

    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // This links to your Node.js backend route
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.url) {
        setLastUrl(data.url);
        alert("Success! Photo is now in Cloudinary.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f4f4f4', borderRadius: '8px' }}>
      <h2>Upload Scout Photo</h2>
      <input type="file" onChange={handleFileSelect} accept="image/*" />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Send to Gallery"}
      </button>

      {lastUrl && (
        <div style={{ marginTop: '15px' }}>
          <p>Direct Link for your Frontend:</p>
          <code style={{ wordBreak: 'break-all' }}>{lastUrl}</code>
          <br />
          <img src={lastUrl} alt="Last Upload" style={{ width: '150px', marginTop: '10px' }} />
        </div>
      )}
    </div>
  );
};

export default GalleryManager;