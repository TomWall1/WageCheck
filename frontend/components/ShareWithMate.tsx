'use client';

import { useState } from 'react';

interface Props {
  awardCode: string;
}

export default function ShareWithMate({ awardCode }: Props) {
  const [message, setMessage] = useState("Worth checking mate, took me 2 mins 👇");
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/check/employment?award=${awardCode}`
      : `/check/employment?award=${awardCode}`;

  const shareText = `${message} ${shareUrl}`;

  function handleCopy() {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const smsHref = `sms:?&body=${encodeURIComponent(shareText)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(
    "Reckon you're getting paid right?"
  )}&body=${encodeURIComponent(shareText)}`;

  return (
    <div className="card space-y-3">
      <div>
        <h3 className="font-bold text-gray-900">Help a mate out 🤙</h3>
        <p className="text-sm text-gray-600 mt-1">
          Know a mate in the same line of work? Send them the calculator — no personal
          details are shared, just a link.
        </p>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Your message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
          maxLength={200}
        />
      </label>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-center text-sm"
        >
          WhatsApp
        </a>
        <a href={smsHref} className="btn-secondary text-center text-sm">
          SMS
        </a>
        <a href={mailHref} className="btn-secondary text-center text-sm">
          Email
        </a>
        <button onClick={handleCopy} className="btn-secondary text-sm">
          {copied ? 'Copied ✓' : 'Copy link'}
        </button>
      </div>

      <p className="text-xs text-gray-400">
        The link opens the calculator with your award pre-selected — no signup required.
      </p>
    </div>
  );
}
