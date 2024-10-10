import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-[#C00]">شكراً لتسجيلك!</h1>
      <p className="mb-8 text-lg">سنتواصل معك قريباً بخصوص فرص الاستثمار في الذكاء الاصطناعي.</p>
      <Button asChild>
        <Link href="https://www.skynewsarabia.com/" target="_blank" rel="noopener noreferrer">
          العودة إلى سكاي نيوز عربية
        </Link>
      </Button>
    </div>
  );
}