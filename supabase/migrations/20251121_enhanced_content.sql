ALTER TABLE public.works ADD COLUMN IF NOT EXISTS before_photos TEXT[];
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS after_photos TEXT[];
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS specs JSONB;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS certifications TEXT[];
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS safety JSONB;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS timeline JSONB;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS staff JSONB;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS lat NUMERIC;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS lng NUMERIC;
ALTER TABLE public.works ADD COLUMN IF NOT EXISTS video_url TEXT;

INSERT INTO public.works (
  title, description, category, featured_image, location, completion_date,
  construction_period, floor_area, client_name, tags, status,
  before_photos, after_photos, specs, certifications, safety, timeline, staff, lat, lng, video_url
) VALUES (
  '学校耐震補強工事',
  '市内小学校校舎の耐震性能向上のため、鋼板ブレース設置とアンカー工法による補強を実施。内装復旧まで一貫対応。',
  '建築',
  '/images/works/school-retrofit.jpg',
  '金沢市',
  '2025-06-30',
  '2ヶ月',
  '—',
  '金沢市教育委員会',
  ARRAY['耐震','補強','学校'],
  'published',
  ARRAY['/images/works/school_before_1.jpg','/images/works/school_before_2.jpg'],
  ARRAY['/images/works/school_after_1.jpg','/images/works/school_after_2.jpg'],
  '{"materials":["高強度モルタル","鋼板ブレース"],"methods":["アンカー工法","耐震補強ブレース設置"],"standards":["建築基準法","JIS G3106"]}'::jsonb,
  ARRAY['一級建築士','一級建築施工管理技士'],
  '{"accident_free_days":60,"ky_activities_per_week":2,"inspections_passed":true}'::jsonb,
  '[{"title":"現地調査","date":"2025-02-01","description":"躯体点検と耐震診断"},{"title":"設計・計画","date":"2025-02-10","description":"補強計画作成"},{"title":"施工","date":"2025-03-01","description":"ブレース設置・アンカー施工"},{"title":"検査・引渡し","date":"2025-03-30","description":"完了検査と引渡し"}]'::jsonb,
  '[{"name":"山田","role":"現場監督","comment":"安全最優先で管理"},{"name":"佐藤","role":"職長","comment":"工程通りに進捗"}]'::jsonb,
  36.561,
  136.656,
  'https://example.com/videos/seismic.mp4'
), (
  '上下水道配管敷設工事',
  '新規宅地開発に伴い、上下水道管の本管敷設・宅内引込を実施。品質試験合格後に供用開始。',
  '設備',
  '/images/works/water-pipeline.jpg',
  '白山市',
  '2025-05-15',
  '1.5ヶ月',
  '—',
  '不動産開発事業者',
  ARRAY['上下水道','配管','インフラ'],
  'published',
  ARRAY['/images/works/water_before_1.jpg','/images/works/water_before_2.jpg'],
  ARRAY['/images/works/water_after_1.jpg','/images/works/water_after_2.jpg'],
  '{"materials":["ダクタイル鋳鉄管","塩ビ管"],"methods":["開削工法","電気融着接合"],"tests":["水圧試験","漏水試験"]}'::jsonb,
  ARRAY['管工事施工管理技士','給水装置工事主任技術者'],
  '{"accident_free_days":45,"ky_activities_per_week":3,"inspections_passed":true}'::jsonb,
  '[{"title":"路線測量","date":"2025-04-01","description":"中心線・横断確認"},{"title":"掘削・床付け","date":"2025-04-10","description":"路盤整正・管路形成"},{"title":"配管・接合","date":"2025-04-20","description":"本管敷設・宅内引込"},{"title":"試験・復旧","date":"2025-05-10","description":"水圧試験・舗装復旧"}]'::jsonb,
  '[{"name":"中村","role":"現場監督","comment":"品質試験を確実に実施"},{"name":"井上","role":"配管工","comment":"接合品質を徹底"}]'::jsonb,
  36.515,
  136.565,
  'https://example.com/videos/waterline.mp4'
), (
  '工場改修・導線改善工事',
  '製造現場の安全性と生産性向上のため、動線再設計・床改修・照明更新・安全設備強化を実施。',
  '建築',
  '/images/works/factory-renovation.jpg',
  '能美市',
  '2025-03-31',
  '2ヶ月',
  '—',
  '製造業A社',
  ARRAY['改修','導線改善','工場'],
  'published',
  ARRAY['/images/works/factory_before_1.jpg','/images/works/factory_before_2.jpg'],
  ARRAY['/images/works/factory_after_1.jpg','/images/works/factory_after_2.jpg'],
  '{"materials":["エポキシ床材","LED照明"],"methods":["動線再設計","床改修施工"],"standards":["労働安全衛生法","JIS Z9110"]}'::jsonb,
  ARRAY['第一種衛生管理者','建築仕上げ施工技能士'],
  '{"accident_free_days":90,"ky_activities_per_week":2,"inspections_passed":true}'::jsonb,
  '[{"title":"現場評価","date":"2025-02-01","description":"導線と危険箇所の把握"},{"title":"設計","date":"2025-02-10","description":"動線改善計画"},{"title":"施工","date":"2025-02-20","description":"床改修・照明更新"},{"title":"検収","date":"2025-03-31","description":"性能確認・引渡し"}]'::jsonb,
  '[{"name":"高橋","role":"現場監督","comment":"安全通路の確保に注力"},{"name":"小林","role":"施工責任者","comment":"工程短縮に成功"}]'::jsonb,
  36.439,
  136.531,
  'https://example.com/videos/factory.mp4'
), (
  '公民館増築工事',
  '地域交流拠点の機能拡充を目的に、ホール増築と設備更新を実施。バリアフリーと省エネに配慮。',
  '公共',
  '/images/works/community-center-expansion.jpg',
  '野々市市',
  '2025-04-27',
  '3ヶ月',
  '—',
  '野々市市',
  ARRAY['公共','増築','バリアフリー'],
  'published',
  ARRAY['/images/works/community_before_1.jpg','/images/works/community_before_2.jpg'],
  ARRAY['/images/works/community_after_1.jpg','/images/works/community_after_2.jpg'],
  '{"materials":["断熱パネル","高効率空調"],"methods":["増築躯体構築","設備更新"],"standards":["省エネ基準","バリアフリー新法"]}'::jsonb,
  ARRAY['建築設備士','CASBEE評価員'],
  '{"accident_free_days":75,"ky_activities_per_week":2,"inspections_passed":true}'::jsonb,
  '[{"title":"基本設計","date":"2025-01-20","description":"用途と動線の整理"},{"title":"躯体工事","date":"2025-02-15","description":"鉄骨建方・躯体形成"},{"title":"仕上・設備","date":"2025-03-20","description":"内装仕上げ・設備更新"},{"title":"完了検査","date":"2025-04-20","description":"法適合確認・引渡し"}]'::jsonb,
  '[{"name":"藤田","role":"現場監督","comment":"地域行事への配慮"},{"name":"森","role":"設備責任者","comment":"空調性能を最適化"}]'::jsonb,
  36.523,
  136.609,
  'https://example.com/videos/community.mp4'
);

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS area_coverage TEXT[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS lead_time TEXT;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS deliverables TEXT[];
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS featured_work_ids UUID[];

UPDATE public.services SET
  area_coverage = ARRAY['石川県','金沢市','白山市','野々市市'],
  lead_time = '2〜6週間',
  deliverables = ARRAY['施工計画書','完成図書','品質試験成績書'],
  featured_work_ids = '{}'::uuid[]
WHERE status = 'active';

INSERT INTO public.news (title, content, excerpt, category, featured_image, published_date, status) VALUES
('地域清掃活動を実施しました','社員有志で会社周辺の清掃活動を実施しました。地域の皆さまとの交流を深め、環境美化に貢献しました。','地域清掃活動のご報告','お知らせ','/images/news/cleanup.jpg','2025-11-21','published'),
('安全表彰受賞のお知らせ','当社の安全管理体制が評価され、建設安全協会より無災害記録の表彰を受けました。今後も安全最優先で取り組みます。','無災害記録の表彰','表彰','/images/news/award.jpg','2025-11-18','published'),
('ISO9001更新審査に合格しました','品質マネジメントシステムの更新審査に合格しました。継続的改善により、品質向上に努めてまいります。','ISO9001更新審査合格','認証','/images/news/iso9001.jpg','2025-11-15','published'),
('社員紹介：施工管理部の新任監督','施工管理部に新任監督が着任しました。現場の安全・品質管理に尽力してまいります。','新任監督のご紹介','社員紹介','/images/news/employee.jpg','2025-11-12','published'),
('災害対応訓練を実施しました','地震想定の災害対応訓練を実施し、初動対応や連絡体制の確認を行いました。','災害訓練の実施報告','安全','/images/news/drill.jpg','2025-11-10','published');

INSERT INTO public.company_stats (stat_name, stat_value, stat_unit, created_at) VALUES
('無災害継続日数', 120, '日', NOW()),
('安全教育受講率', 95, '%', NOW()),
('保有認証数', 8, '件', NOW()),
('品質検査合格率', 98, '%', NOW()),
('月次安全パトロール回数', 4, '回', NOW());