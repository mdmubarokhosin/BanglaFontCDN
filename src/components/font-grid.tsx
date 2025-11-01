import type { Font } from '@/types/font';
import FontCard from './font-card';

interface FontGridProps {
  fonts: Font[];
  fontSize: number;
  previewText: string;
}

export default function FontGrid({ fonts, fontSize, previewText }: FontGridProps) {
  if (fonts.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <h2 className="text-2xl font-headline">কোনো ফন্ট পাওয়া যায়নি।</h2>
        <p>অনুগ্রহ করে অন্য কিছু অনুসন্ধান করুন।</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {fonts.map((font) => (
        <FontCard key={font.id} font={font} fontSize={fontSize} previewText={previewText} />
      ))}
    </div>
  );
}
