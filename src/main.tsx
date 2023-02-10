import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => {
  return (
    <h1>App</h1>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
