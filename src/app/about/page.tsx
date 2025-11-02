
import Header from '@/components/header';
import { Users, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight">
              আমাদের সম্পর্কে
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              বাংলা ফন্ট সিডিএন-এর পেছনের গল্প এবং আমাদের লক্ষ্য।
            </p>
          </div>

          <div className="space-y-16">
            <div className="text-center">
              <div className="inline-block p-3 bg-primary/10 rounded-lg">
                  <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold font-headline mt-4">আমাদের লক্ষ্য</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-2">
                বাংলা ফন্ট সিডিএন-এর প্রধান লক্ষ্য হলো ডেভেলপার এবং ডিজাইনারদের জন্য বিনামূল্যে ও সহজে ব্যবহারযোগ্য বাংলা ফন্টের একটি নির্ভরযোগ্য উৎস তৈরি করা। আমরা বিশ্বাস করি, সুন্দর ফন্ট ব্যবহারের মাধ্যমে বাংলা ভাষার ডিজিটাল উপস্থাপনা আরও আকর্ষণীয় এবং সমৃদ্ধ হতে পারে।
              </p>
            </div>

            <div className="text-center">
               <div className="inline-block p-3 bg-accent/10 rounded-lg">
                  <Heart className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold font-headline mt-4">আমাদের অনুপ্রেরণা</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mt-2">
               বাংলা ভাষায় সমৃদ্ধ একটি ডিজিটাল বিশ্ব গড়ার স্বপ্নই আমাদের অনুপ্রেরণা। আমরা চাই, যে কেউ যেন কোনো কারিগরি বাধা ছাড়াই তাদের প্রকল্পে সুন্দর বাংলা ফন্ট ব্যবহার করতে পারে। এই প্রকল্পটি কমিউনিটির জন্য এবং কমিউনিটির দ্বারাই পরিচালিত।
              </p>
            </div>

            <div className="text-center pt-8">
              <div className="inline-block p-3 bg-primary/10 rounded-lg">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mt-4 font-headline">নেপথ্যের কারিগর</h2>
              <p className="mt-2 max-w-2xl mx-auto text-muted-foreground">
                আমরা একদল उत्साही ডেভেলপার এবং ডিজাইনার, যারা বাংলা ভাষার প্রতি ভালোবাসা থেকে এই প্রকল্পটি শুরু করেছি। আমাদের এই যাত্রায় আপনার অংশগ্রহণকেও আমরা স্বাগত জানাই।
              </p>
            </div>
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
