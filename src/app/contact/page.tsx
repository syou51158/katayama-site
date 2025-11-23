'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Upload, Send, User, FileText } from 'lucide-react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const contactSchema = z.object({
  name: z.string().min(2, 'お名前を入力してください'),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  address: z.string().optional(),
  request_type: z.enum(['demolition', 'exterior', 'paving', 'utilities', 'other', 'estimate']),
  message: z.string().min(10, '詳細を10文字以上入力してください'),
  consent: z.boolean().refine(val => val === true, {
    message: '個人情報の取り扱いに同意してください'
  }),
  files: z.array(z.string()).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      request_type: 'estimate',
      consent: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!captchaToken) {
      alert('認証を完了してください');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone || '');
      formData.append('address', data.address || '');
      formData.append('requestType', data.request_type);
      formData.append('message', data.message);
      formData.append('consent', data.consent.toString());
      formData.append('h-captcha-response', captchaToken);

      // Add uploaded files
      uploadedFiles.forEach((file, index) => {
        formData.append(`file${index + 1}`, file);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setUploadedFiles([]);
        setCaptchaToken('');
      } else {
        setSubmitStatus('error');
        alert(result.error || '送信に失敗しました');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      alert('送信エラーが発生しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`${file.name}は10MBを超えています`);
        continue;
      }
      newFiles.push(file);
    }
    
    setUploadedFiles([...uploadedFiles, ...newFiles.map(file => file.name)]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
            お問い合わせ
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            お見積もり・ご相談は無料です。お気軽にお問い合わせください。
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-12 h-12 bg-[#1D2E45] rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D2E45] mb-2">お電話</h3>
              <p className="text-gray-700 mb-4">0120-XXX-XXX</p>
              <p className="text-sm text-gray-500">平日 9:00-18:00</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-12 h-12 bg-[#B79B6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D2E45] mb-2">メール</h3>
              <p className="text-gray-700 mb-4">info@katayama-k.jp</p>
              <p className="text-sm text-gray-500">24時間受付</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-12 h-12 bg-[#1D2E45] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D2E45] mb-2">所在地</h3>
              <p className="text-gray-700 mb-4">東京都XX区XX町</p>
              <p className="text-sm text-gray-500">地図を見る</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1D2E45] mb-4 font-serif">
                お問い合わせフォーム
              </h2>
              <p className="text-gray-600">
                以下のフォームに必要事項をご記入ください。
                24時間以内にご返信させていただきます。
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  お問い合わせありがとうございます。
                  内容を確認次第、ご連絡させていただきます。
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  エラーが発生しました。もう一度お試しください。
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B79B6B] focus:border-transparent"
                    placeholder="山田 太郎"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B79B6B] focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  電話番号
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B79B6B] focus:border-transparent"
                    placeholder="03-XXXX-XXXX"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  住所・地番
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="address"
                    {...register('address')}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B79B6B] focus:border-transparent"
                    placeholder="東京都世田谷区○○町X-X-X"
                  />
                </div>
              </div>

              {/* Request Type */}
              <div>
                <label htmlFor="request_type" className="block text-sm font-medium text-gray-700 mb-2">
                  お問い合わせ種別 <span className="text-red-500">*</span>
                </label>
                <select
                  id="request_type"
                  {...register('request_type')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B79B6B] focus:border-transparent"
                >
                  <option value="estimate">お見積もり依頼</option>
                  <option value="demolition">解体工事について</option>
                  <option value="exterior">外構工事について</option>
                  <option value="paving">舗装工事について</option>
                  <option value="utilities">設備工事について</option>
                  <option value="other">その他</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message')}
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B79B6B] focus:border-transparent"
                    placeholder="お問い合わせ内容を詳しくご記入ください..."
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  参考資料（任意）
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">ファイルをドラッグ&ドロップ、または</p>
                  <label className="cursor-pointer">
                    <span className="text-[#B79B6B] hover:text-[#A68B5A] font-medium">クリックして選択</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    10MB以下、最大3枚までアップロード可能
                  </p>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm text-gray-700">{file}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          削除
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* hCaptcha */}
              <div className="flex justify-center">
                <HCaptcha
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || '10000000-ffff-ffff-ffff-000000000001'}
                  onVerify={(token) => setCaptchaToken(token)}
                />
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-1 h-4 w-4 text-[#B79B6B] focus:ring-[#B79B6B] border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    <a href="/privacy" target="_blank" className="text-[#B79B6B] hover:text-[#A68B5A] underline">
                      個人情報の取り扱い
                    </a>
                    に同意する <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-sm text-red-600">{errors.consent.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-4 bg-[#B79B6B] hover:bg-[#C8AB7C] disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      送信中...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      送信する
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}