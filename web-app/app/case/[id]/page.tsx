import { notFound } from 'next/navigation';
import CaseOpeningClient from './CaseOpeningClient';
import casesData from '@/data/cases.json';

// Static export için tüm case ID'lerini belirt
export async function generateStaticParams() {
  return casesData.map((caseItem) => ({
    id: caseItem.id,
  }));
}

// Dynamic params'ı kapat (sadece önceden tanımlı ID'ler çalışsın)
export const dynamicParams = false;

interface PageProps {
  params: {
    id: string;
  };
}

export default function CaseOpeningPage({ params }: PageProps) {
  const caseData = casesData.find((c) => c.id === params.id);

  if (!caseData) {
    notFound();
  }

  return <CaseOpeningClient caseData={caseData} />;
}
