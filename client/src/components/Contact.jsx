import { useState } from 'react';
import WaveDivider from './WaveDivider.jsx';
import './Contact.css';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const initialForm = { name: '', email: '', phone: '', message: '', website: '' };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const firstError = data.errors?.[0]?.message;
        setStatus({ state: 'error', message: firstError || data.message || 'Something went wrong.' });
        return;
      }

      setStatus({ state: 'success', message: data.message });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        state: 'error',
        message: 'Could not reach the server. Please check your connection and try again.',
      });
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-top-divider">
        <WaveDivider fill="#0B5FA8" />
      </div>
      <div className="container contact-grid">
        <div className="contact-intro">
          <h2>Get Purflo delivered.</h2>
          <p>
            Tell us your bottle size and delivery area, and we'll set up a schedule that fits
            your home, office or event.
          </p>
          <ul className="contact-details">
            <li>
              <strong>Phone</strong>
              <span>+92 300 0000000</span>
            </li>
            <li>
              <strong>Email</strong>
              <span>orders@purflowater.com</span>
            </li>
            <li>
              <strong>Delivery hours</strong>
              <span>Mon–Sat, 9am–7pm</span>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot field: hidden from real users via CSS, bots often fill it in */}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              minLength={2}
              maxLength={100}
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>

          <div className="form-row form-row-split">
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={150}
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone">Phone (optional)</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                maxLength={20}
                value={form.phone}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
              />
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Bottle size, delivery area, and how often you'd like a refill"
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'}>
            {status.state === 'loading' ? 'Sending…' : 'Send message'}
          </button>

          {status.state === 'success' && (
            <p className="form-feedback success" role="status">
              {status.message}
            </p>
          )}
          {status.state === 'error' && (
            <p className="form-feedback error" role="alert">
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;
