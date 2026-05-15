export const runtime = 'edge';

import AdminEditFontClient from './client';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditFontPage({ params }: Props) {
  const { id } = await params;
  return <AdminEditFontClient fontId={id} />;
}
