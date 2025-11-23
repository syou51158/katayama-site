import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Tag, ExternalLink } from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with actual Supabase data fetching
const works = [
  {
    id: '1',
    title: '木造住宅解体工事',
    slug: 'wooden-house-demolition',
    category: 'demolition',
    city: '東京都世田谷区',
    date: '2024-03-15',
    cover_url: 'https://via.placeholder.com/1200x800/1D2E45/FFFFFF?text=木造住宅解体',
    gallery: [
      'https://via.placeholder.com/800x600/1D2E45/FFFFFF?text=解体前',
      'https://via.placeholder.com/800x600/B79B6B/FFFFFF?text=解体作業中',
      'https://via.placeholder.com/800x600/2A3E5A/FFFFFF?text=更地化完了'
    ],
    tags: ['木造住宅', '解体工事', '世田谷区'],
    published: true,
    body_md: `# 木造住宅解体工事

東京都世田谷区の木造2階建て住宅の解体工事を担当させていただきました。

## 工事概要

- **工事種別**: 木造住宅解体
- **所在地**: 東京都世田谷区
- **工期**: 2024年3月
- **建物規模**: 2階建て、延床面積120㎡

## 作業内容

近隣への配慮を第一に、騒音・振動対策を徹底しながら安全に解体作業を進めました。
建て替えのための更地化が無事完了しました。

### 安全対策

作業前に近隣の方への挨拶回りを行い、作業日程についてご説明させていただきました。
騒音や振動が最小限になるよう、手作業での解体を中心に進めました。

### 廃棄物処理

産業廃棄物として適切に分別し、提携の処理業者にて適正処理を行いました。`
  },
  {
    id: '2',
    title: '外構・駐車場舗装工事',
    slug: 'exterior-parking-paving',
    category: 'paving',
    city: '神奈川県川崎市',
    date: '2024-02-20',
    cover_url: 'https://via.placeholder.com/1200x800/B79B6B/FFFFFF?text=外構舗装工事',
    gallery: [
      'https://via.placeholder.com/800x600/B79B6B/FFFFFF?text=施工前',
      'https://via.placeholder.com/800x600/1D2E45/FFFFFF?text=施工中',
      'https://via.placeholder.com/800x600/2A3E5A/FFFFFF?text=完成'
    ],
    tags: ['外構工事', '舗装', '川崎市'],
    published: true,
    body_md: `# 外構・駐車場舗装工事

神奈川県川崎市の戸建て住宅の外構工事と駐車場舗装を施工しました。

## 工事概要

- **工事種別**: 外構工事・舗装
- **所在地**: 神奈川県川崎市
- **工期**: 2024年2月
- **施工内容**: カーポート設置、駐車場舗装、フェンス設置

## 作業内容

お客様のライフスタイルに合わせた機能的な外構を実現しました。
耐久性とデザイン性を兼ね備えた舗装を施工しました。`
  }
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function WorkDetailPage({ params }: PageProps) {
  const work = works.find(w => w.slug === params.slug);

  if (!work) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
              {work.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-200">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-[#B79B6B]" />
                {work.city}
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[#B79B6B]" />
                {new Date(work.date).toLocaleDateString('ja-JP')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Cover Image */}
              <div className="mb-8">
                <img
                  src={work.cover_url}
                  alt={work.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div 
                    className="prose-headings:font-serif prose-headings:text-[#1D2E45] prose-p:text-gray-700 prose-strong:text-[#1D2E45]"
                    dangerouslySetInnerHTML={{ __html: work.body_md }}
                  />
                </div>
              </div>

              {/* Gallery */}
              {work.gallery && work.gallery.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-[#1D2E45] mb-6 font-serif">施工写真</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {work.gallery.map((image, index) => (
                      <div key={index} className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                        <img
                          src={image}
                          alt={`${work.title} - 写真 ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Project Info */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-[#1D2E45] mb-4 font-serif">工事情報</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">工事種別</span>
                      <p className="text-gray-900">
                        {work.category === 'demolition' && '解体工事'}
                        {work.category === 'paving' && '舗装工事'}
                        {work.category === 'exterior' && '外構工事'}
                        {work.category === 'utilities' && '設備工事'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">所在地</span>
                      <p className="text-gray-900">{work.city}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">工期</span>
                      <p className="text-gray-900">{new Date(work.date).toLocaleDateString('ja-JP')}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {work.tags && work.tags.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-[#1D2E45] mb-4 font-serif">タグ</h3>
                    <div className="flex flex-wrap gap-2">
                      {work.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4 font-serif">お問い合わせ</h3>
                  <p className="text-sm text-gray-200 mb-4">
                    同様の工事をご検討の方は、お気軽にお問い合わせください。
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-medium rounded-lg transition-colors"
                  >
                    お問い合わせフォーム
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              href="/works"
              className="inline-flex items-center px-6 py-3 bg-white text-[#1D2E45] hover:text-[#B79B6B] font-medium rounded-lg shadow-md transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              施工実績一覧に戻る
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-medium rounded-lg shadow-md transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}