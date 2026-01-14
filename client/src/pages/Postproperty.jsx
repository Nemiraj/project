import { useState } from 'react';
import './PostProperty.css';

const PostProperty = () => {
  const [formData, setFormData] = useState({
    title: '', description: '', type: '', status: '', price: '',
    address: '', city: '', state: '', zip_code: '',
    bedrooms: '', bathrooms: '', area_sqft: '', year_built: '', parking_spaces: '',
    features: '', // Keeps input text
    agent_name: '', agent_email: '', agent_phone: ''
  });

  const [base64Images, setBase64Images] = useState([]); // Stores the image strings
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  // === Helper: File to Base64 ===
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // === Handle File Select ===
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    
    // Convert all files to Base64
    const promises = files.map(file => convertToBase64(file));
    const converted = await Promise.all(promises);

    setBase64Images(prev => [...prev, ...converted]);
  };

  const removeImage = (index) => {
    setBase64Images(prev => prev.filter((_, i) => i !== index));
  };

  // === Submit Form ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Build JSON Payload
      const payload = {
        ...formData,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area_sqft: Number(formData.area_sqft),
        year_built: Number(formData.year_built),
        parking_spaces: Number(formData.parking_spaces),
        // Convert features string "Pool, Gym" -> Array ["Pool", "Gym"]
        features: formData.features.split(',').map(f => f.trim()).filter(f => f !== ''),
        // Send Images array
        images: base64Images 
      };

      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // IMPORTANT
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to submit');
      }

      setStatus({ type: 'success', message: 'Property listed successfully!' });
      
      // Reset
      setFormData({
        title: '', description: '', type: '', status: '', price: '',
        address: '', city: '', state: '', zip_code: '',
        bedrooms: '', bathrooms: '', area_sqft: '', year_built: '', parking_spaces: '',
        features: '', agent_name: '', agent_email: '', agent_phone: ''
      });
      setBase64Images([]);

    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pp-page">
      <div className="pp-container">
        <h2>Add New Property</h2>
        
        {status.message && (
          <div className={`pp-status ${status.type}`}>{status.message}</div>
        )}

        <form onSubmit={handleSubmit} className="pp-form">
          {/* Section 1: Basic Info */}
          <div className="pp-section">
            <h3>Basic Info</h3>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <div className="pp-row">
              <select name="type" value={formData.type} onChange={handleChange} required>
                <option value="">Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
              <select name="status" value={formData.status} onChange={handleChange} required>
                <option value="">Status</option>
                <option value="sale">Sale</option>
                <option value="rent">Rent</option>
              </select>
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="pp-section">
            <h3>Location</h3>
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <div className="pp-row">
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
              <input name="state" value={formData.state} onChange={handleChange} placeholder="State" />
              <input name="zip_code" value={formData.zip_code} onChange={handleChange} placeholder="Zip" />
            </div>
          </div>

          {/* Section 3: Details */}
          <div className="pp-section">
            <h3>Details</h3>
            <div className="pp-row-mini">
              <input type="number" name="bedrooms" placeholder="Beds" value={formData.bedrooms} onChange={handleChange} />
              <input type="number" name="bathrooms" placeholder="Baths" value={formData.bathrooms} onChange={handleChange} />
              <input type="number" name="area_sqft" placeholder="Sqft" value={formData.area_sqft} onChange={handleChange} />
              <input type="number" name="parking_spaces" placeholder="Parking" value={formData.parking_spaces} onChange={handleChange} />
              <input type="number" name="year_built" placeholder="Year" value={formData.year_built} onChange={handleChange} />
            </div>
            <input name="features" value={formData.features} onChange={handleChange} placeholder="Features (comma separated: Pool, Gym)" />
          </div>

          {/* Section 4: Images */}
          <div className="pp-section">
            <h3>Images</h3>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
            
            <div className="pp-preview-grid">
              {base64Images.map((img, idx) => (
                <div key={idx} className="pp-thumb-wrap">
                  <img src={img} alt="preview" className="pp-thumb" />
                  <button type="button" onClick={() => removeImage(idx)}>×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Agent */}
          <div className="pp-section">
            <h3>Agent</h3>
            <div className="pp-row">
              <input name="agent_name" value={formData.agent_name} onChange={handleChange} placeholder="Name" />
              <input name="agent_email" value={formData.agent_email} onChange={handleChange} placeholder="Email" />
              <input name="agent_phone" value={formData.agent_phone} onChange={handleChange} placeholder="Phone" />
            </div>
          </div>

          <button type="submit" className="pp-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Submit Property'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostProperty;