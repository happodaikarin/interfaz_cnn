import React, { useState } from 'react';
import './App.css'
function App() {
  const [imagen, setImagen] = useState(null);
  const [prediccion, setPrediccion] = useState('');

  const enviarImagen = async () => {
    if (!imagen) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imagen);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      setPrediccion(result.prediccion);
    } catch (error) {
      alert('Error al enviar la imagen: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={enviarImagen}>Enviar Imagen</button>
      {prediccion && <div>Predicción: {prediccion}</div>}
    </div>
  );
}

export default App;

