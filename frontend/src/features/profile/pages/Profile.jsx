import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: '',
    country: ''
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/profiles/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setFormData({
          phone: data.phone || '',
          address: data.address || '',
          city: data.city || '',
          country: data.country || ''
        });
      }
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    try {
      let response;
      const payload = {
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    country: formData.country,
    user: { id: user.id }  // ← Format attendu par le backend
};

      if (profile) {
        response = await fetch(`http://localhost:8080/api/profiles/${profile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch('http://localhost:8080/api/profiles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        const saved = await response.json();
        setProfile(saved);
        setMessage('✅ Profil mis à jour avec succès !');
        setEditing(false);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      setMessage('❌ Erreur lors de l\'enregistrement');
    }
  };

  if (loading) {
    return <div className="profile-loading">⏳ Chargement de votre profil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>👤 Mon Profil</h1>
          <p>Gérez vos informations personnelles</p>
        </div>

        <div className="profile-user-info">
          <div className="profile-user-avatar">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </div>
          <div className="profile-user-details">
            <h3>{user?.firstName} {user?.lastName}</h3>
            <p>{user?.email}</p>
          </div>
        </div>

        {message && <div className="profile-success">{message}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0612345678"
              disabled={!editing && profile}
            />
          </div>

          <div className="profile-form-group">
            <label>Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Rue Example"
              disabled={!editing && profile}
            />
          </div>

          <div className="profile-form-row">
            <div className="profile-form-group">
              <label>Ville</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Casablanca"
                disabled={!editing && profile}
              />
            </div>
            <div className="profile-form-group">
              <label>Pays</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Maroc"
                disabled={!editing && profile}
              />
            </div>
          </div>

          {!profile || editing ? (
            <div className="profile-buttons">
              <button type="submit" className="profile-btn-save">
                💾 Enregistrer
              </button>
              {editing && (
                <button type="button" className="profile-btn-cancel" onClick={() => {
                  setEditing(false);
                  if (profile) {
                    setFormData({
                      phone: profile.phone || '',
                      address: profile.address || '',
                      city: profile.city || '',
                      country: profile.country || ''
                    });
                  }
                }}>
                  Annuler
                </button>
              )}
            </div>
          ) : (
            <button type="button" className="profile-btn-edit" onClick={() => setEditing(true)}>
              ✏️ Modifier mon profil
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;