import { useState } from 'react'
import { testConnection, register, login } from './core/services/api';
import './App.css'

function App() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const testBackend = async () => {
    try {
      const response = await testConnection()
      setMessage(`✅ Backend connecté ! ${response.data.length} produits trouvés`)
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`)
    }
  }

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password) {
      setMessage('❌ Veuillez remplir tous les champs')
      return
    }

    try {
      const response = await register({ firstName, lastName, email, password })
      setMessage(`✅ Inscription réussie: ${response.data.message}`)
      // Vider les champs
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
    } catch (error) {
      setMessage(`❌ Erreur: ${error.response?.data?.message || error.message}`)
    }
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('❌ Veuillez remplir email et mot de passe')
      return
    }

    try {
      const response = await login({ email, password })
      setMessage(`✅ Connexion réussie: ${response.data.message}`)
    } catch (error) {
      setMessage(`❌ Erreur: ${error.response?.data?.message || error.message}`)
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '500px', margin: '0 auto' }}>
      <h1>🧪 Test connexion Backend</h1>
      
      <button onClick={testBackend} style={{ padding: '10px', margin: '10px 0', cursor: 'pointer' }}>
        🔌 Tester API /products
      </button>
      
      <hr />
      
      <h3>📝 Inscription</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button onClick={handleRegister} style={{ padding: '10px', cursor: 'pointer', background: 'green', color: 'white' }}>
          S'inscrire
        </button>
      </div>
      
      <hr />
      
      <h3>🔐 Connexion</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px', cursor: 'pointer', background: 'blue', color: 'white' }}>
          Se connecter
        </button>
      </div>
      
      <hr />
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', borderRadius: '5px' }}>
        <strong>📡 Réponse:</strong> {message || "En attente d'action..."}
      </div>
    </div>
  )
}

export default App