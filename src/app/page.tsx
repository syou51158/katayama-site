import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, MapPin, Shield, Clock, Users } from 'lucide-react';
import { getWorks } from '@/lib/supabase';
import { Metadata } from 'next';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { CardSkeleton } from '@/components/ui/LoadingStates';

export const metadata: Metadata = {
  title: 'ホーム',
  description: '片山建設工業は、解体工事・外構工事・舗装工事を中心に、建設業全般を手がけるプロフェッショナル集団です。お客様のニーズに寄り添い、安心と安全を提供します。',
  openGraph: {
    title: '片山建設工業株式会社 - 信頼と実績の建設パートナー',
    description: '解体工事・外構工事・舗装工事のプロフェッショナル。お客様のニーズに寄り添い、安心と安全を提供します。',
    images: ['/og-home.jpg'],
  },
};

export default async function Home() {
  // Fetch recent works from database
  let recentWorks: any[] = [];
  let worksError = null;
  
  try {
    recentWorks = await getWorks(undefined, 3);
  } catch (error) {
    console.error('Error fetching works:', error);
    worksError = error;
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
                信頼と実績の
                <br />
                <span className="text-[#B79B6B]">建設パートナー</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                片山建設工業は、解体工事・外構工事・舗装工事を中心に、
                建設業全般を手がけるプロフェッショナル集団です。
                お客様のニーズに寄り添い、安心と安全を提供します。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-semibold rounded-lg transition-colors"
                >
                  お問い合わせ
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-[#1D2E45] font-semibold rounded-lg transition-colors"
                >
                  事業内容を見る
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">代表写真</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1D2E45] mb-4">
              私たちのプロセス
            </h2>
            <p className="text-lg text-gray-600">
              お客様に安心していただける、確かな3つのステップ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1D2E45] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1D2E45] mb-3 font-serif">ヒアリング・調査</h3>
              <p className="text-gray-600">
                お客様のご要望を丁寧にお伺いし、現地調査を行い、
                最適なプランをご提案いたします。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#B79B6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1D2E45] mb-3 font-serif">更地化・施工</h3>
              <p className="text-gray-600">
                安全を最優先に、確実な工事を行います。
                近隣への配慮も忘れません。
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1D2E45] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#1D2E45] mb-3 font-serif">完成・引渡し</h3>
              <p className="text-gray-600">
                完工後もアフターフォローでサポート。
                お客様の満足が私たちの喜びです。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1D2E45] mb-4">
              なぜ私たちが選ばれるのか
            </h2>
            <p className="text-lg text-gray-600">
              私たちの強みは、経験と実績に裏打ちされた確かな技術力
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#1D2E45] rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1D2E45] mb-3 font-serif">安全への取り組み</h3>
              <p className="text-gray-600">
                安全第一を徹底し、すべての現場で安全基準を遵守。
                定期的な安全研修を実施しています。
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#B79B6B] rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1D2E45] mb-3 font-serif">迅速な対応</h3>
              <p className="text-gray-600">
                お客様のご要望に素早く対応。
                緊急時も24時間以内に対応いたします。
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-[#1D2E45] rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1D2E45] mb-3 font-serif">地域に根ざした対応</h3>
              <p className="text-gray-600">
                地域の特性を熟知し、近隣への配慮を忘れず、
                信頼関係を大切にしています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1D2E45] mb-4">
              施工実績
            </h2>
            <p className="text-lg text-gray-600">
              これまでの施工実績をご紹介いたします
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {worksError ? (
              <div className="col-span-3 text-center text-red-500">
                <p>データの読み込み中にエラーが発生しました。</p>
                <p className="text-sm mt-2">しばらく経ってから再度お試しください。</p>
              </div>
            ) : recentWorks.length > 0 ? (
              recentWorks.map((work) => (
                <div key={work.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-200">
                    {work.featured_image ? (
                      <OptimizedImage
                        src={work.featured_image}
                        alt={work.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span>施工写真</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#1D2E45] mb-2 font-serif">
                      {work.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {work.location ? `${work.location}の` : ''}建設工事を担当させていただきました。
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>工期: {work.completion_date ? new Date(work.completion_date).toLocaleDateString('ja-JP') : '調整中'}</span>
                      <span>場所: {work.location || '情報なし'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                <p>施工実績データを読み込んでいます...</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/works"
              className="inline-flex items-center px-6 py-3 bg-[#1D2E45] hover:bg-[#2A3E5A] text-white font-semibold rounded-lg transition-colors"
            >
              実績をもっと見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1D2E45] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">
            お見積もり・ご相談は無料です
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            まずはお気軽にお問い合わせください。
            専門スタッフが丁寧に対応いたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-semibold rounded-lg transition-colors"
            >
              お問い合わせフォーム
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-[#B79B6B]" />
                <span>0120-XXX-XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#B79B6B]" />
                <span>info@katayama-k.jp</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
