import { supabaseAdmin } from '../src/lib/supabase-admin';

const sampleWorks = [
  {
    title: '木造住宅解体工事',
    slug: 'wooden-house-demolition',
    category: 'demolition',
    body_md: `# 木造住宅解体工事

東京都世田谷区の木造2階建て住宅の解体工事を担当させていただきました。

## 工事概要
- **工事種別**: 木造住宅解体
- **所在地**: 東京都世田谷区
- **工期**: 2024年3月
- **建物規模**: 2階建て、延床面積120㎡

## 作業内容
近隣への配慮を第一に、騒音・振動対策を徹底しながら安全に解体作業を進めました。
建て替えのための更地化が無事完了しました。`,
    city: '東京都世田谷区',
    date: '2024-03-15',
    cover_url: 'https://via.placeholder.com/800x600/1D2E45/FFFFFF?text=木造住宅解体',
    gallery: [
      'https://via.placeholder.com/800x600/1D2E45/FFFFFF?text=解体前',
      'https://via.placeholder.com/800x600/B79B6B/FFFFFF?text=解体作業中',
      'https://via.placeholder.com/800x600/2A3E5A/FFFFFF?text=更地化完了'
    ],
    tags: ['木造住宅', '解体工事', '世田谷区'],
    published: true
  },
  {
    title: '外構・駐車場舗装工事',
    slug: 'exterior-parking-paving',
    category: 'paving',
    body_md: `# 外構・駐車場舗装工事

神奈川県川崎市の戸建て住宅の外構工事と駐車場舗装を施工しました。

## 工事概要
- **工事種別**: 外構工事・舗装
- **所在地**: 神奈川県川崎市
- **工期**: 2024年2月
- **施工内容**: カーポート設置、駐車場舗装、フェンス設置

## 作業内容
お客様のライフスタイルに合わせた機能的な外構を実現しました。
耐久性とデザイン性を兼ね備えた舗装を施工しました。`,
    city: '神奈川県川崎市',
    date: '2024-02-20',
    cover_url: 'https://via.placeholder.com/800x600/B79B6B/FFFFFF?text=外構舗装工事',
    gallery: [
      'https://via.placeholder.com/800x600/B79B6B/FFFFFF?text=施工前',
      'https://via.placeholder.com/800x600/1D2E45/FFFFFF?text=施工中',
      'https://via.placeholder.com/800x600/2A3E5A/FFFFFF?text=完成'
    ],
    tags: ['外構工事', '舗装', '川崎市'],
    published: true
  },
  {
    title: '商業施設解体工事',
    slug: 'commercial-building-demolition',
    category: 'demolition',
    body_md: `# 商業施設解体工事

東京都港区の商業施設（鉄骨造3階建て）の解体工事を担当しました。

## 工事概要
- **工事種別**: 商業施設解体
- **所在地**: 東京都港区
- **工期**: 2024年1月
- **建物規模**: 鉄骨造3階建て、延床面積450㎡

## 作業内容
都市部での解体工事ということで、近隣への配慮と安全対策を徹底。
計画的に進め、予定通りに完工しました。`,
    city: '東京都港区',
    date: '2024-01-10',
    cover_url: 'https://via.placeholder.com/800x600/2A3E5A/FFFFFF?text=商業施設解体',
    gallery: [
      'https://via.placeholder.com/800x600/2A3E5A/FFFFFF?text=解体前',
      'https://via.placeholder.com/800x600/1D2E45/FFFFFF?text=解体作業',
      'https://via.placeholder.com/800x600/B79B6B/FFFFFF?text=完了'
    ],
    tags: ['商業施設', '鉄骨造', '解体工事', '港区'],
    published: true
  }
];

const samplePosts = [
  {
    title: '新年度の始まりに向けて',
    slug: 'new-year-2024',
    body_md: `# 新年度の始まりに向けて

2024年度の新しいスタートを迎え、皆様に感謝の気持ちを申し上げます。

今年も「安全と品質」をモットーに、お客様に満足していただける工事を心がけてまいります。

## 今年の目標
- より一層の安全対策の強化
- お客様満足度の向上
- 地域貢献活動の拡大

どうぞ今年も片山建設工業をよろしくお願いいたします。`,
    published_at: '2024-04-01',
    cover_url: 'https://via.placeholder.com/800x400/1D2E45/FFFFFF?text=新年度'
  },
  {
    title: '夏季休業のお知らせ',
    slug: 'summer-holiday-2024',
    body_md: `# 夏季休業のお知らせ

平素より格別のご高配を賜り、厚く御礼申し上げます。

誠に勝手ながら、下記の期間を夏季休業とさせていただきます。

## 休業期間
**2024年8月13日（火）～ 8月15日（木）**

休業中のお問い合わせにつきましては、8月16日（金）以降に順次対応させていただきます。

緊急の場合は、通常の連絡先までご連絡ください。`,
    published_at: '2024-07-15',
    cover_url: 'https://via.placeholder.com/800x400/B79B6B/FFFFFF?text=夏季休業'
  }
];

const samplePages = [
  {
    slug: 'privacy',
    title: 'プライバシーポリシー',
    body_md: `# プライバシーポリシー

片山建設工業株式会社（以下、「当社」）は、お客様の個人情報保護の重要性を認識し、以下のとおりプライバシーポリシーを定めます。

## 1. 個人情報の収集
当社は、お問い合わせ、お見積もり依頼等を通じて、お客様の氏名、連絡先等の個人情報を収集させていただく場合があります。

## 2. 個人情報の利用目的
収集した個人情報は、以下の目的で利用いたします。
- お問い合わせへの回答
- お見積もりの作成・送付
- 工事に関するご連絡
- サービス向上のための統計データ作成

## 3. 個人情報の管理
当社は、お客様の個人情報を適切に管理し、不正アクセス、紛失、破損、改ざん、漏洩等の防止に努めます。`
  },
  {
    slug: 'legal',
    title: '特定商取引法に基づく表記',
    body_md: `# 特定商取引法に基づく表記

## 事業者情報
**商号**: 片山建設工業株式会社
**代表者**: 片山 太郎
**所在地**: 東京都XX区XX町X-X-X
**電話番号**: 0120-XXX-XXX
**メールアドレス**: info@katayama-k.jp

## 販売価格
各工事により異なります。お見積もりをご依頼ください。

## 代金の支払方法
銀行振込、現金支払い

## 工事期間
工事内容により異なります。お見積もり時にご提示いたします。`
  }
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Insert sample works
    console.log('📋 Inserting sample works...');
    for (const work of sampleWorks) {
      const { error } = await supabaseAdmin
        .from('works')
        .insert(work);
      
      if (error) {
        console.error('Error inserting work:', error);
      } else {
        console.log(`✅ Inserted work: ${work.title}`);
      }
    }

    // Insert sample posts
    console.log('📝 Inserting sample posts...');
    for (const post of samplePosts) {
      const { error } = await supabaseAdmin
        .from('posts')
        .insert(post);
      
      if (error) {
        console.error('Error inserting post:', error);
      } else {
        console.log(`✅ Inserted post: ${post.title}`);
      }
    }

    // Insert sample pages
    console.log('📄 Inserting sample pages...');
    for (const page of samplePages) {
      const { error } = await supabaseAdmin
        .from('pages')
        .insert(page);
      
      if (error) {
        console.error('Error inserting page:', error);
      } else {
        console.log(`✅ Inserted page: ${page.title}`);
      }
    }

    console.log('✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Run the seed script
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };