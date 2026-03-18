import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WageCheck — Know Your Hospitality Rights',
  description:
    'Find out what you should be paid under the Hospitality Industry General Award 2020. Free, plain-English, and built for workers — not lawyers.',
  keywords: ['wage theft', 'hospitality award', 'fair work', 'underpaid', 'Australia', 'hospitality worker'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <body className="min-h-screen flex flex-col">
        {/* Disclaimer banner — persistent */}
        <div className="bg-warning-50 border-b border-warning-400 px-4 py-2 text-center text-sm text-warning-800">
          <strong>General information only — not legal advice.</strong> If you think you've been underpaid,{' '}
          <a
            href="https://www.fairwork.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold hover:text-warning-600"
          >
            contact Fair Work
          </a>{' '}
          or an employment lawyer.
        </div>

        <header className="bg-white border-b border-gray-200 px-4 py-4">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-xl text-gray-900">WageCheck</span>
            </a>
            <div className="text-xs text-gray-500 text-right">
              <div>Hospitality Award 2020</div>
              <div>Rates effective 1 July 2025</div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 px-4 py-6 mt-8">
          <div className="max-w-2xl mx-auto text-sm text-gray-500 space-y-2">
            <p>
              <strong className="text-gray-700">This tool provides general information only — not legal advice.</strong>{' '}
              Pay rates shown are minimum rates under the Hospitality Industry (General) Award 2020,
              effective 1 July 2025. Always verify current rates at{' '}
              <a
                href="https://www.fairwork.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                fairwork.gov.au
              </a>
              . Rates are updated each July.
            </p>
            <p>
              WageCheck does not store any personal information. Your shift details exist only in your browser
              session and are not sent to any server.
            </p>
            <p className="text-gray-400 text-xs">
              Rates last updated: 1 July 2025 &middot; Next review: July 2026 &middot;{' '}
              Need help?{' '}
              <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" className="underline">
                Fair Work Ombudsman
              </a>{' '}
              &middot; 13 13 94
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
