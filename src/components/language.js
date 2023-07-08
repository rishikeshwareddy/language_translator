import React, { useState } from 'react';
import axios from 'axios';

const LanguageTranslator = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language is English
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default target language is Spanish

  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://translation-api.example.com/translate',
        {
          text: sourceText,
          sourceLanguage,
          targetLanguage
        }
      );
      setTargetText(response.data.translation);
    } catch (error) {
      console.error('Translation error:', error);
      // Handle error state here
    }
  };

  return (
    <div>
      <h1>Language Translator</h1>
      <textarea
        value={sourceText}
        onChange={(e) => setSourceText(e.target.value)}
        placeholder="Enter text to translate"
      ></textarea>
      <br />
      <label>Source Language:</label>
      <select
        value={sourceLanguage}
        onChange={(e) => setSourceLanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        {/* Add more language options here */}
      </select>
      <br />
      <label>Target Language:</label>
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        {/* Add more language options here */}
      </select>
      <br />
      <button onClick={translateText}>Translate</button>
      <br />
      <textarea
        value={targetText}
        readOnly
        placeholder="Translated text"
      ></textarea>
    </div>
  );
};

export default LanguageTranslator;
