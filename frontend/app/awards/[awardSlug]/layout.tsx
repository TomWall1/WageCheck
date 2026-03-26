import { notFound } from 'next/navigation';
import { getAwardBySlug } from '@/lib/awards';

interface Props {
  children: React.ReactNode;
  params: Promise<{ awardSlug: string }>;
}

export default async function AwardLayout({ children, params }: Props) {
  const { awardSlug } = await params;
  const award = getAwardBySlug(awardSlug);
  if (!award) notFound();

  return <>{children}</>;
}
