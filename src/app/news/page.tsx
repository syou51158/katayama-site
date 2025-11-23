import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getPosts } from '@/lib/supabase';

export default async function NewsPage() {
  const posts = await getPosts();
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold font-serif mb-6">
            お知らせ
          </h1>
          <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
            片山建設工業の最新情報をお届けします
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    {post.cover_url ? (
                      <img
                        src={post.cover_url || ''}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1D2E45] to-[#B79B6B] flex items-center justify-center">
                        <span className="text-white font-semibold">お知らせ</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#1D2E45] text-white px-3 py-1 rounded-full text-sm font-medium">
                        お知らせ
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2 text-[#B79B6B]" />
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('ja-JP') : '日付不明'}
                      <Clock className="h-4 w-4 ml-4 mr-2 text-[#B79B6B]" />
                      5分で読める
                    </div>
                    <h2 className="text-xl font-bold text-[#1D2E45] mb-3 font-serif hover:text-[#B79B6B] transition-colors">
                      <Link href={`/news/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {post.body_md ? post.body_md.substring(0, 100) + '...' : '記事の内容を読むには続きをクリックしてください。'}
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/news/${post.slug}`}
                        className="inline-flex items-center text-[#1D2E45] hover:text-[#B79B6B] font-medium transition-colors"
                      >
                        続きを読む
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                <p>現在、お知らせがありません。</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#1D2E45] mb-4">
            最新情報をお届けします
          </h2>
          <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
            新しいお知らせや施工実績が追加されたら、
            いち早くお届けします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#B79B6B] hover:bg-[#C8AB7C] text-white font-semibold rounded-lg transition-colors"
            >
              メールマガジン登録
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#1D2E45] text-[#1D2E45] hover:bg-[#1D2E45] hover:text-white font-semibold rounded-lg transition-colors"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}