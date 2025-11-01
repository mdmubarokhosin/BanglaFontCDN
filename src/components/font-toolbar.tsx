'use client';

import { Search, Text, CaseSensitive, Type } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface FontToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  previewText: string;
  setPreviewText: (text: string) => void;
}

export default function FontToolbar({
  searchQuery,
  setSearchQuery,
  fontSize,
  setFontSize,
  previewText,
  setPreviewText
}: FontToolbarProps) {
  return (
    <div className="mb-8 p-4 bg-card rounded-lg shadow-sm border border-border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="ফন্ট অনুসন্ধান করুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            aria-label="ফন্ট অনুসন্ধান"
          />
        </div>
        <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="পূর্বরূপ পাঠ্য..."
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="pl-10"
              aria-label="পূর্বরূপ পাঠ্য"
            />
        </div>
        <div className="flex items-center gap-4">
          <CaseSensitive className="h-6 w-6 text-muted-foreground" />
          <Slider
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            min={12}
            max={72}
            step={1}
            aria-label="ফন্টের আকার"
          />
          <span className="text-lg font-semibold w-12 text-right">{fontSize}px</span>
        </div>
      </div>
    </div>
  );
}
