
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Code, BookText } from 'lucide-react';

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="text-sm bg-gray-900 text-white p-4 rounded-md overflow-x-auto mt-2">
    <code>{children}</code>
  </pre>
);

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary font-headline tracking-tight">
              ব্যবহারবিধি
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              বাংলা ফন্ট সিডিএন ব্যবহার করার সম্পূর্ণ নির্দেশিকা।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 md:sticky md:top-24 h-fit">
              <div className="border bg-card rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 font-headline flex items-center gap-2"><BookText className="w-5 h-5 text-primary"/>সুচিপত্র</h3>
                <ul className="space-y-2">
                  {[
                    { href: '#introduction', title: 'ভূমিকা' },
                    { href: '#default-usage', title: '১. বাংলা ফন্ট ব্যবহার' },
                    { href: '#minified-usage', title: '২. মিনিফায়েড ভার্সন' },
                    { href: '#english-font', title: '৩. ইংরেজি ফন্টসহ' },
                    { href: '#full-example', title: '৪. সম্পূর্ণ উদাহরণ' },
                  ].map(item => (
                    <li key={item.href}>
                      <a href={item.href} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-200"></span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="md:col-span-3 space-y-12">
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
