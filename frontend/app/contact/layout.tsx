import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Review My Pay',
  description: 'Get in touch with Review My Pay. Questions about your award, pay rates, or the calculator? We are here to help.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
