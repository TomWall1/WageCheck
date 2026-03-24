'use client';

import { useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      await emailjs.send('service_dazyrqm', 'template_uw29dno', {
        name,
        email,
        message,
        time: new Date().toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' }),
      }, { publicKey: 'V5xR56gKnor6BPRVI' });

      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send. Please try emailing us directly.');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    fontSize: '14.5px',
    fontFamily: 'inherit',
    border: '1.5px solid var(--border)',
    borderRadius: '8px',
    background: '#fff',
    color: 'var(--secondary)',
    outline: 'none',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--secondary)',
    marginBottom: '6px',
    letterSpacing: '0.01em',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '560px' }}>
      <div style={{ paddingBottom: '1.5rem', borderBottom: '1.5px solid var(--border)' }}>
        <h1 style={{
          fontFamily: 'Fraunces, Georgia, serif',
          fontWeight: 500,
          fontSize: '2rem',
          letterSpacing: '-0.03em',
          color: 'var(--secondary)',
          marginBottom: '0.5rem',
          lineHeight: 1.15,
        }}>
          Contact
        </h1>
        <p style={{ fontSize: '15px', color: '#37474F', lineHeight: 1.65 }}>
          Get in touch with questions about the tool, or to report a calculation error.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '14.5px', color: '#37474F', lineHeight: 1.7 }}>
        <p>
          If you&apos;ve spotted a rate that looks wrong, a missing award, or a bug in the calculator, we want to know.
          Please include as much detail as you can — the award, classification, shift type, and what you expected to see.
        </p>
        <p>
          We also welcome general questions about how the tool works, feedback on the experience, or suggestions for awards to add.
        </p>
      </div>

      {status === 'sent' ? (
        <div style={{
          padding: '20px 24px',
          background: '#e8f5e9',
          border: '1.5px solid #66bb6a',
          borderRadius: '10px',
          color: '#2e7d32',
          fontSize: '14.5px',
          lineHeight: 1.6,
        }}>
          <p style={{ fontWeight: 600, marginBottom: '4px' }}>Message sent</p>
          <p>Thanks for getting in touch. We&apos;ll get back to you as soon as we can.</p>
          <button
            onClick={() => setStatus('idle')}
            style={{
              marginTop: '12px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--primary)',
              background: 'none',
              border: '1.5px solid var(--primary)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Honeypot — hidden from real users */}
          <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="contact-name" style={labelStyle}>Name</label>
            <input
              id="contact-name"
              type="text"
              required
              maxLength={200}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label htmlFor="contact-email" style={labelStyle}>Email</label>
            <input
              id="contact-email"
              type="email"
              required
              maxLength={320}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label htmlFor="contact-message" style={labelStyle}>Message</label>
            <textarea
              id="contact-message"
              required
              maxLength={5000}
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue or question — include the award, classification, and shift details if reporting a rate error."
              style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
            />
            <p style={{ fontSize: '12px', color: 'var(--secondary-muted)', marginTop: '4px', textAlign: 'right' }}>
              {message.length.toLocaleString()}/5,000
            </p>
          </div>

          {status === 'error' && (
            <div style={{
              padding: '12px 16px',
              background: '#fbe9e7',
              border: '1.5px solid #ef5350',
              borderRadius: '8px',
              color: '#c62828',
              fontSize: '13.5px',
              lineHeight: 1.5,
            }}>
              {errorMsg || 'Something went wrong. Please try again or email us directly.'}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              padding: '12px 24px',
              fontSize: '15px',
              fontWeight: 600,
              fontFamily: 'inherit',
              color: '#fff',
              background: status === 'sending' ? 'var(--secondary-muted)' : 'var(--primary)',
              border: 'none',
              borderRadius: '8px',
              cursor: status === 'sending' ? 'not-allowed' : 'pointer',
              transition: 'background 0.15s',
              alignSelf: 'flex-start',
            }}
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
        </form>
      )}

      <div style={{
        padding: '16px 20px',
        background: 'var(--primary-light)',
        border: '1.5px solid var(--primary)',
        borderRadius: '10px',
        fontSize: '14.5px',
      }}>
        <p style={{ fontWeight: 600, color: 'var(--secondary)', marginBottom: '4px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Or email us directly
        </p>
        <a
          href="mailto:reviewmypayapp@gmail.com"
          style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '15px', textDecoration: 'none' }}
        >
          reviewmypayapp@gmail.com
        </a>
      </div>

      <p style={{ fontSize: '13px', color: 'var(--secondary-muted)' }}>
        This tool provides general information only — not legal advice. For urgent workplace issues,
        contact the Fair Work Ombudsman on <strong style={{ color: 'var(--secondary)' }}>13 13 94</strong> or visit{' '}
        <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--secondary)' }}>
          fairwork.gov.au
        </a>.
      </p>
    </div>
  );
}
