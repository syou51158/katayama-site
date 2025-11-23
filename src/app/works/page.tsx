import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Tag } from 'lucide-react';
import { getWorks } from '@/lib/supabase';

export default async function WorksPage() {
  const works = await getWorks();
  
  const categories = [
    { id: 'all', name: 'すべて', count: works.length },
    { id: 'demolition', name: '解体工事', count: works.filter((w: any) => w.category === 'demolition').length },
    { id: 'paving', name: '舗装工事', count: works.filter((w: any) => w.category === 'paving').length },
    { id: 'exterior', name: '外構工事', count: works.filter((w: any) => w.category === 'exterior').length },
    { id: 'utilities', name: '土木・管工事', count: works.filter((w: any) => w.category === 'utilities').length },
    { id: 'real-estate', name: '不動産', count: works.filter((w: any) => w.category === 'real-estate').length }
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
            施工実績
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            これまでの施工実績をご紹介いたします。
            私たちの技術力と実績をご確認ください。
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  category.id === 'all'
                    ? 'bg-[#1D2E45] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Works Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work) => (
              <article
                key={work.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  {work.cover_url && (
                    <img
                      src={work.cover_url}
                      alt={work.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#1D2E45] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {work.category === 'demolition' && '解体工事'}
                    {work.category === 'paving' && '舗装工事'}
                    {work.category === 'exterior' && '外構工事'}
                    {work.category === 'utilities' && '土木・管工事'}
                    {work.category === 'real-estate' && '不動産'}
                  </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#1D2E45] mb-3 font-serif hover:text-[#B79B6B] transition-colors">
                    <Link href={`/works/${work.slug}`}>
                      {work.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {work.body_md ? work.body_md.substring(0, 150) + '...' : '施工実績の詳細を読むには続きをクリックしてください。'}
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#B79B6B]" />
                      {work.city}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-[#B79B6B]" />
                      {work.date ? new Date(work.date).toLocaleDateString('ja-JP') : '日付不明'}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {work.tags && work.tags.length > 0 ? (
                      work.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                        >
                          <Tag className="h-3 w-3 inline mr-1" />
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">タグなし</span>
                    )}
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/works/${work.slug}`}
                      className="inline-flex items-center text-[#1D2E45] hover:text-[#B79B6B] font-medium transition-colors"
                    >
                      詳細を見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1D2E45] mb-4">
            施工実績をもっと見たい方へ
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            より詳しい施工事例や、特定の条件での事例をお探しの方は、
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-semibold rounded-lg transition-colors"
            >
              お問い合わせ
            </a>
            <a
              href="tel:0120-XXX-XXX"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#1D2E45] text-[#1D2E45] hover:bg-[#1D2E45] hover:text-white font-semibold rounded-lg transition-colors"
            >
              お電話で相談
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}