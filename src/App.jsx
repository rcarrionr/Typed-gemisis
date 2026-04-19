import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { MATEO_28_TEXT } from './mateo28';
import './App.css';

function App() {
  const el = useRef(null);
  const typed = useRef(null);
  const [index, setIndex] = useState(0);
  const [fontSize, setFontSize] = useState(7); // Tamaño inicial en vmin

  // Inicializar/Reiniciar Typed.js cuando cambia el índice
  useEffect(() => {
    typed.current = new Typed(el.current, {
      strings: [MATEO_28_TEXT[index]],
      typeSpeed: 10,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.current.destroy();
    };
  }, [index]);

  // Manejo de teclado: Navegación y Zoom
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case 'Enter':
          setIndex((prev) => (prev + 1) % MATEO_28_TEXT.length);
          break;
        case 'ArrowLeft':
          setIndex((prev) => (prev - 1 + MATEO_28_TEXT.length) % MATEO_28_TEXT.length);
          break;
        case 'ArrowUp':
          event.preventDefault(); // Evitar scroll accidental
          setFontSize((prev) => Math.min(prev + 0.5, 20)); // Máximo 20vmin
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFontSize((prev) => Math.max(prev - 0.5, 2));   // Mínimo 2vmin
          break;
        case ' ':
          typed.current.toggle();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="reader-container">
      <div className="content-wrapper">
        {/* Aplicamos el tamaño de fuente dinámico aquí */}
        <span 
          ref={el} 
          className="typed-text" 
          style={{ fontSize: `${fontSize}vmin` }} 
        />
        
        <div className="navigation-hint">
          {index + 1} / {MATEO_28_TEXT.length} | Zoom: {Math.round(fontSize * 10) / 10}
        </div>
      </div>
    </div>
  );
}

export default App;
