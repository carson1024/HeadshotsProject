"use client"
import { useState } from 'react';
import { Button } from './ui/button';

export default function Upload() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setMessage('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setMessage(`Image uploaded successfully: ${data.filePath}`);
    } catch (error) {
      setMessage('Error uploading file: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }} className="flex">
    <div className="lg:w-1/2 px-2">
      <form onSubmit={handleSubmit}>
        <input type="file" className="py-6" accept="image/*" onChange={handleFileChange} required />
        <Button type="submit" className='lg:w-full py-6 px-2 md:px-8 shadow-md text-xl flex w-full md:w-auto  md:inline-flex justify-center items-center rounded-full  font-semibold bg-[#20aca0] focus:ring-2 focus:ring-offset-2 transition-all'>
          + UPLOAD
        </Button>
      </form>
    </div>
    {preview && (
    <div className="lg:w-1/2">
      <h3>Preview:</h3>
      <img src={preview} alt="Preview" className="w-full h-full" />
    </div>
    )}

    {message && <p>{message}</p>}
    </div>
  );
}
