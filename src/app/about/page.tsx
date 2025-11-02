
import { Users, Target, Heart, Zap, Feather, Package, Wind, Download, Code, BookText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/header';

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

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="text-sm bg-gray-900 text-white p-4 rounded-md overflow-x-auto mt-2">
    <code>{children}</code>
  </pre>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight">
              আমাদের সম্পর্কে
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              বাংলা ফন্ট সিডিএন-এর পেছনের গল্প, আমাদের লক্ষ্য এবং ব্যবহারবিধি।
            </p>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="about">আমাদের সম্পর্কে</TabsTrigger>
              <TabsTrigger value="features">ফিচারসমূহ</TabsTrigger>
              <TabsTrigger value="usage">ব্যবহারবিধি</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
                <div className="space-y-16 mt-12">
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
                        আমরা একদল উৎসাহী ডেভেলপার এবং ডিজাইনার, যারা বাংলা ভাষার প্রতি ভালোবাসা থেকে এই প্রকল্পটি শুরু করেছি। আমাদের এই যাত্রায় আপনার অংশগ্রহণকেও আমরা স্বাগত জানাই।
                        </p>
                    </div>
                </div>
            </TabsContent>
            
            <TabsContent value="features">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {features.map((feature, index) => (
                    <div key={index} className="bg-card border rounded-lg p-6 flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
                        <div className="p-3 bg-primary/10 rounded-lg mt-1">
                            <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-headline text-xl font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm mt-1">{feature.description}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="usage">
                <div className="space-y-12 mt-8">
                  <section id="introduction">
                    <h2 className="text-3xl font-bold font-headline mb-4 border-b pb-2">ভূমিকা</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      আমাদের সিডিএন ব্যবহার করে আপনি খুব সহজেই আপনার ওয়েবসাইটে সুন্দর বাংলা ফন্ট যোগ করতে পারেন। আমরা ডিফল্ট এবং মিনিফায়েড—দুই ধরনের সিএসএস ফাইল সরবরাহ করি, যা আপনার প্রয়োজন অনুযায়ী ব্যবহার করা যাবে।
                    </p>
                  </section>

                  <section id="default-usage">
                    <h2 className="text-3xl font-bold font-headline mb-4 border-b pb-2">১. বাংলা ফন্ট ব্যবহার (ডিফল্ট)</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      যেকোনো বাংলা ফন্ট ব্যবহার করার জন্য, প্রথমে ফন্টের সিএসএস লিঙ্কটি আপনার HTML ফাইলের <strong>&lt;head&gt;</strong> ট্যাগের ভেতরে যুক্ত করুন।
                    </p>
                    <CodeBlock>
    {`<link href='https://cdnmx.pages.dev/assets/fonts/kalpurush/font.css' rel='stylesheet'>`}
                    </CodeBlock>
                    <p className="text-muted-foreground leading-relaxed my-4">
                      এরপর, আপনার সিএসএস ফাইলে ফন্টটি ব্যবহার করুন:
                    </p>
                    <CodeBlock>
    {`body {
        font-family: 'Kalpurush', sans-serif;
    }`}
                    </CodeBlock>
                  </section>
                  
                  <section id="minified-usage">
                    <h2 className="text-3xl font-bold font-headline mb-4 border-b pb-2">২. বাংলা ফন্ট ব্যবহার (মিনিফায়েড ভার্সন)</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      ওয়েবসাইটের পারফরম্যান্স দ্রুত করার জন্য, আপনি মিনিফায়েড সিএসএস ফাইল ব্যবহার করতে পারেন। এর জন্য লিঙ্কটির শেষে <strong>.min.css</strong> যোগ করুন।
                    </p>
                    <CodeBlock>
    {`<link href='https://cdnmx.pages.dev/assets/fonts/kalpurush/font.min.css' rel='stylesheet'>`}
                    </CodeBlock>
                    <p className="text-muted-foreground leading-relaxed my-4">
                      সিএসএস ব্যবহারবিধি একই থাকবে।
                    </p>
                  </section>
                  
                  <section id="english-font">
                    <h2 className="text-3xl font-bold font-headline mb-4 border-b pb-2">৩. বাংলা ফন্টের সাথে ইংরেজি ফন্ট ব্যবহার</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      অনেক সময় বাংলা ফন্টের সাথে একটি মানানসই ইংরেজি ফন্ট ব্যবহারের প্রয়োজন হয়। যেমন, Hind Siliguri ফন্টের সাথে PT Sans একটি দারুণ সমন্বয়।
                    </p>
                    <CodeBlock>
    {`<link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">`}
                    </CodeBlock>
                    <p className="text-muted-foreground leading-relaxed my-4">
                      সিএসএস ফাইলে এভাবে ব্যবহার করুন:
                    </p>
                    <CodeBlock>
    {`body {
        font-family: 'Hind Siliguri', 'PT Sans', sans-serif;
    }`}
                    </CodeBlock>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      এতে ব্রাউজার প্রথমে বাংলা লেখার জন্য 'Hind Siliguri' ফন্টটি খুঁজবে। যদি কোনো অক্ষর ওই ফন্টে না পাওয়া যায় (যেমন ইংরেজি), তখন 'PT Sans' ফন্টটি ব্যবহৃত হবে।
                    </p>
                  </section>

                  <section id="full-example">
                    <h2 className="text-3xl font-bold font-headline mb-4 border-b pb-2">৪. HTML-এ সম্পূর্ণ উদাহরণ</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      নিচে একটি সম্পূর্ণ HTML উদাহরণ দেওয়া হলো, যেখানে কালপুরুষ ফন্ট ব্যবহার করা হয়েছে।
                    </p>
                    <CodeBlock>
    {`<!DOCTYPE html>
    <html lang="bn">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>বাংলা ফন্ট উদাহরণ</title>
        <link href='https://cdnmx.pages.dev/assets/fonts/kalpurush/font.css' rel='stylesheet'>
        <style>
            body {
                font-family: 'Kalpurush', sans-serif;
                font-size: 18px;
                line-height: 1.8;
            }
        </style>
    </head>
    <body>
        <h1>আমার সোনার বাংলা</h1>
        <p>আমার সোনার বাংলা, আমি তোমায় ভালোবাসি।</p>
    </body>
    </html>`}
                    </CodeBlock>
                  </section>
                </div>
            </TabsContent>
          </Tabs>

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
