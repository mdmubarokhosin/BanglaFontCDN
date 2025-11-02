
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Feather, Package, Wind, Heart, Download } from 'lucide-react';

const features = [
  {
    icon: Wind,
    title: 'দ্রুতগতির সিডিএন',
    description: 'আমাদের অপটিমাইজ করা সিডিএন আপনার ওয়েবসাইটে দ্রুত ফন্ট লোড নিশ্চিত করে।',
  },
  {
    icon: Package,
    title: 'বিশাল ফন্ট সংগ্রহ',
    description: 'জনপ্রিয় এবং ক্লাসিক বাংলা ফন্টের একটি বিশাল সংগ্রহ থেকে বেছে নিন।',
  },
  {
    icon: Feather,
    title: 'সহজ ব্যবহার',
    description: 'মাত্র এক লাইন কোড ব্যবহার করে আপনার প্রকল্পে বাংলা ফন্ট যোগ করুন।',
  },
  {
    icon: Download,
    title: 'ফন্ট ডাউনলোড',
    description: 'আপনার প্রিয় ফন্টগুলো অফলাইনে ব্যবহারের জন্য সহজেই ডাউনলোড করুন।',
  },
  {
    icon: Heart,
    title: 'পছন্দের তালিকা',
    description: 'আপনার পছন্দের ফন্টগুলো একটি তালিকায় সংরক্ষণ করুন এবং পরে ব্যবহার করুন।',
  },
  {
    icon: Zap,
    title: 'পারফরম্যান্স অপটিমাইজেশন',
    description: 'মিনিফায়েড CSS এবং Preload অপশন ব্যবহার করে আপনার সাইটের পারফরম্যান্স বাড়ান।',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight">
              আমাদের ফিচারসমূহ
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              বাংলা ফন্ট সিডিএন-এর প্রধান বৈশিষ্ট্য এবং সুবিধাগুলো দেখুন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
