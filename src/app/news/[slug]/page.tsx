import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Tag, Share2 } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPostBySlug } from '@/lib/supabase';
import { generateArticleStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません',
      description: 'お探しの記事は見つかりませんでした。',
    };
  }

  return {
    title: post.title,
    description: post.body_md ? post.body_md.substring(0, 160) : post.title,
    openGraph: {
      title: post.title,
      description: post.body_md ? post.body_md.substring(0, 160) : post.title,
      type: 'article',
      publishedTime: post.published_at || undefined,
      modifiedTime: post.updated_at,
      images: post.cover_url ? [post.cover_url] : ['/og-default.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.body_md ? post.body_md.substring(0, 160) : post.title,
      images: post.cover_url ? [post.cover_url] : ['/og-default.jpg'],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const articleStructuredData = generateArticleStructuredData(
    post.title,
    post.body_md || post.title,
    post.published_at || post.created_at,
    post.updated_at,
    '片山建設工業株式会社',
    post.cover_url || undefined
  );

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'ホーム', url: '/' },
    { name: 'お知らせ', url: '/news' },
    { name: post.title, url: `/news/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleStructuredData, breadcrumbStructuredData]),
        }}
      />
      <div className="min-h-screen">
        {/* Article Header */}
        <section className="relative bg-gradient-to-br from-[#1D2E45] to-[#2A3E5A] text-white py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/news"
                className="inline-flex items-center text-[#B79B6B] hover:text-[#C8AB7C] mb-6 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                お知らせ一覧に戻る
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-6">
                {post.title}
              </h1>
              <div className="flex items-center justify-center space-x-6 text-gray-300">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-[#B79B6B]" />
                  {post.published_at ? new Date(post.published_at).toLocaleDateString('ja-JP') : '日付不明'}
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#B79B6B]" />
                  5分で読める
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {post.cover_url && (
              <div className="mb-12">
                <img
                  src={post.cover_url}
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {post.body_md}
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="mt-12 flex items-center justify-between border-t pt-8">
              <Link
                href="/news"
                className="inline-flex items-center text-[#1D2E45] hover:text-[#B79B6B] font-medium transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                一覧に戻る
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">シェア:</span>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.body_md?.substring(0, 100),
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('URLをコピーしました');
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>シェア</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}