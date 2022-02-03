import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function AvatarGenerationPage() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [gender, setGender] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('gender', gender);
    formData.append('file', file);
    await axios.post('/api/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return (
    <div>
      <form className="avatar-generation-form">
        <div className="form-question">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-question">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            name="height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="form-question">
          <label htmlFor="weight">Weight (Kg)</label>
          <input
            type="number"
            name="weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-question">
          <div>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={() => setGender('Male')}
            />
          </div>
          <div>
            <label htmlFor="name">Female</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={() => setGender('Female')}
            />
          </div>
        </div>
        <div className="form-question">
          <label htmlFor="name">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          Create Avatar
        </button>
      </form>
    </div>
  );
}
