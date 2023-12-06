import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root.jsx'
import { store } from './app/store';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
