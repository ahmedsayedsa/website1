import PackageDetailView from '@/components/packages/PackageDetailView';
import { notFound } from 'next/navigation';

export default async function PackageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!slug) notFound();

    return <PackageDetailView pkgId={slug} />;
}
