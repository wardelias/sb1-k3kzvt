'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export default function LeadForm({ className = '' }: { className?: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    investmentAmount: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('تم تقديم النموذج بنجاح');
        setFormData({ fullName: '', email: '', phone: '', investmentAmount: '' });
        router.push('/Thankyou');
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('حدث خطأ أثناء تقديم النموذج. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={`space-y-4 ${className}`} onSubmit={handleSubmit}>
      <Input
        name="fullName"
        placeholder="الاسم الكامل"
        className="text-right"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        placeholder="البريد الإلكتروني"
        type="email"
        className="text-right"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        name="phone"
        placeholder="رقم الهاتف"
        type="tel"
        className="text-right"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <Input
        name="investmentAmount"
        placeholder="مبلغ الاستثمار المتوقع (اختياري)"
        type="number"
        className="text-right"
        value={formData.investmentAmount}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'جاري التقديم...' : 'سجّل الآن'}
      </Button>
    </form>
  );
}