<<<<<<< HEAD
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Olá, Gilberto 🚀</h1>
      <p>Seu React + Vite está rodando!</p>
    </div>
  )
}

export default App
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
>>>>>>> 6ecbd0c344b711addd99238d331ac18d70c7054c
