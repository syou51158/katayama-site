import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function TestConnection() {
  let works = []
  let news = []
  let error = null

  try {
    // Test works table
    const { data: worksData, error: worksError } = await supabase
      .from('works')
      .select('*')
      .eq('status', 'published')
      .limit(3)

    if (worksError) throw worksError
    works = worksData || []

    // Test news table
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('*')
      .eq('status', 'published')
      .limit(3)

    if (newsError) throw newsError
    news = newsData || []

  } catch (err) {
    error = err
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#1D2E45] mb-8">データベース接続テスト</h1>
        
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <h2 className="font-bold mb-2">エラーが発生しました</h2>
            <p>{error instanceof Error ? error.message : 'Unknown error occurred'}</p>
            <pre className="text-sm mt-2 bg-red-50 p-2 rounded">{JSON.stringify(error, null, 2)}</pre>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <h2 className="font-bold">✅ データベース接続成功</h2>
            <p>データベースから正常にデータを取得しました。</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#1D2E45] mb-4">施工実績 ({works.length}件)</h2>
            {works.length > 0 ? (
              <div className="space-y-3">
                {works.map((work) => (
                  <div key={work.id} className="border-b pb-3">
                    <h3 className="font-semibold">{work.title}</h3>
                    <p className="text-sm text-gray-600">{work.category}</p>
                    {work.location && <p className="text-sm text-gray-500">場所: {work.location}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">データがありません</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-[#1D2E45] mb-4">ニュース ({news.length}件)</h2>
            {news.length > 0 ? (
              <div className="space-y-3">
                {news.map((article) => (
                  <div key={article.id} className="border-b pb-3">
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-600">{article.category}</p>
                    {article.published_date && (
                      <p className="text-sm text-gray-500">
                        公開日: {new Date(article.published_date).toLocaleDateString('ja-JP')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">データがありません</p>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-[#1D2E45] mb-4">環境情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Supabase URL:</strong></p>
              <p className="text-gray-600 break-all">{process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
            </div>
            <div>
              <p><strong>Node.js:</strong></p>
              <p className="text-gray-600">{process.version}</p>
            </div>
            <div>
              <p><strong>環境:</strong></p>
              <p className="text-gray-600">{process.env.NODE_ENV}</p>
            </div>
            <div>
              <p><strong>タイムスタンプ:</strong></p>
              <p className="text-gray-600">{new Date().toLocaleString('ja-JP')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}