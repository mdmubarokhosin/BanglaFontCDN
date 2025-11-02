
'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/header';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Copy, icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import iconData from '@/data/lucide-icons.json';

type IconName = keyof typeof icons;

interface IconInfo {
  name: string;
  banglaName: string;
}

const iconComponentMap = icons as { [key: string]: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>> };

export default function IconsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const allIcons: IconInfo[] = useMemo(() => iconData, []);

  const filteredIcons = allIcons.filter(icon => 
    icon.banglaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (iconName: string) => {
    navigator.clipboard.writeText(`<${iconName} />`);
    toast({
      title: 'কপি হয়েছে!',
      description: `<${iconName} /> কোডটি আপনার ক্লিপবোর্ডে কপি করা হয়েছে।`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight">
              আইকনসমূহ
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              আপনার প্রকল্পের জন্য প্রয়োজনীয় আইকন খুঁজুন এবং ব্যবহার করুন।
            </p>
          </div>

          <div className="relative mb-12 max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="আইকন অনুসন্ধান করুন (যেমন: user, home)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 h-12 rounded-full bg-card border-2 focus:border-primary"
              aria-label="আইকন অনুসন্ধান"
            />
          </div>

          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredIcons.map((icon) => {
                const IconComponent = iconComponentMap[icon.name as IconName];
                if (!IconComponent) return null;
                return (
                  <Card
                    key={icon.name}
                    onClick={() => copyToClipboard(icon.name)}
                    className="group flex flex-col items-center justify-center p-4 aspect-square text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:text-primary bg-card active:scale-95"
                  >
                    <CardContent className="p-0 flex flex-col items-center justify-center gap-3">
                      <IconComponent className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                      <p className="text-xs text-muted-foreground group-hover:text-primary truncate">{icon.banglaName}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
             <div className="text-center py-16 text-muted-foreground">
                <h2 className="text-2xl font-headline">কোনো আইকন পাওয়া যায়নি।</h2>
                <p>অনুগ্রহ করে অন্য কিছু অনুসন্ধান করুন।</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-card border-t mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} বাংলা ফন্ট সিডিএন। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}

    