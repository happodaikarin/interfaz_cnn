import React, { useState } from 'react';
import './ImageUpload.css'; // Importar CSS

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setPrediction(result.prediccion);
    } catch (error) {
      alert('Error al enviar la imagen: ' + error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Clasificar Imagen</button>
      </form>
      {prediction && <div>Clasificación: {prediction}</div>}
    </div>
  );
}

export default ImageUpload;
