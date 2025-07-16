-- リスティング広告ランキングサイト項目生成システム 初期データ

-- 共通項目マスタのデータ挿入
INSERT INTO common_items (name, description, priority, seo_weight, content_guidelines) VALUES
('ランキング表示', '各サービスの順位を明確に表示する項目', 'required', 10, '{"recommendedLength": 50, "keywordSuggestions": ["ランキング", "順位", "比較"], "avoidExpressions": ["絶対", "確実"]}'),
('料金比較', '各サービスの料金を比較できる表形式の項目', 'required', 9, '{"recommendedLength": 200, "keywordSuggestions": ["料金", "価格", "費用", "コスト"], "avoidExpressions": ["最安値", "絶対安い"]}'),
('口コミ・評価', 'ユーザーの口コミや評価を表示する項目', 'recommended', 8, '{"recommendedLength": 300, "keywordSuggestions": ["口コミ", "評価", "レビュー"], "avoidExpressions": ["確実に効果", "必ず満足"]}'),
('アクセス情報', '店舗やクリニックへのアクセス方法', 'required', 7, '{"recommendedLength": 150, "keywordSuggestions": ["アクセス", "交通", "最寄り駅"], "avoidExpressions": []}'),
('営業時間', '営業時間や受付時間の情報', 'required', 6, '{"recommendedLength": 100, "keywordSuggestions": ["営業時間", "受付時間", "診療時間"], "avoidExpressions": []}'),
('予約方法', '予約の取り方や連絡先情報', 'recommended', 7, '{"recommendedLength": 150, "keywordSuggestions": ["予約", "申し込み", "問い合わせ"], "avoidExpressions": []}'),
('キャンペーン情報', '現在実施中のキャンペーンや割引情報', 'optional', 5, '{"recommendedLength": 200, "keywordSuggestions": ["キャンペーン", "割引", "特典"], "avoidExpressions": ["期間限定", "今だけ"]}'),
('FAQ', 'よくある質問と回答', 'recommended', 6, '{"recommendedLength": 400, "keywordSuggestions": ["FAQ", "質問", "回答"], "avoidExpressions": []}'),
('運営者情報', 'サイト運営者の情報', 'required', 4, '{"recommendedLength": 100, "keywordSuggestions": ["運営者", "会社情報"], "avoidExpressions": []}');

-- ジャンルマスタのデータ挿入
INSERT INTO genres (name, category, seo_keywords) VALUES
('医療脱毛', 'medical', ARRAY['医療脱毛', '永久脱毛', 'レーザー脱毛', 'クリニック']),
('AGA治療', 'medical', ARRAY['AGA', '薄毛治療', '発毛', '育毛', 'クリニック']),
('包茎手術', 'medical', ARRAY['包茎手術', '泌尿器科', 'クリニック']),
('痩身治療', 'medical', ARRAY['痩身', 'ダイエット', '医療痩身', 'クリニック']),
('美容整形', 'beauty', ARRAY['美容整形', '美容外科', 'クリニック']),
('フィットネス', 'fitness', ARRAY['フィットネス', 'ジム', 'トレーニング']);

-- ジャンル別専門項目マスタのデータ挿入
-- 医療脱毛
INSERT INTO genre_specific_items (genre_id, name, description, priority, seo_weight, content_guidelines) VALUES
(1, '施術方法', '使用する脱毛機器や施術方法の説明', 'required', 9, '{"recommendedLength": 200, "keywordSuggestions": ["レーザー", "IPL", "アレキサンドライト"], "avoidExpressions": ["永久に生えない", "確実に脱毛"]}'),
(1, '痛みレベル', '施術時の痛みの程度や痛み軽減対策', 'recommended', 7, '{"recommendedLength": 150, "keywordSuggestions": ["痛み", "麻酔", "冷却"], "avoidExpressions": ["無痛", "全く痛くない"]}'),
(1, '施術回数', '完了までの目安回数', 'required', 8, '{"recommendedLength": 100, "keywordSuggestions": ["回数", "期間", "間隔"], "avoidExpressions": ["必ず", "確実に"]}'),
(1, '部位別料金', '各部位の料金詳細', 'required', 9, '{"recommendedLength": 300, "keywordSuggestions": ["部位", "料金", "コース"], "avoidExpressions": ["最安値", "絶対安い"]}'),
(1, 'アフターケア', '施術後のケア方法やサポート', 'recommended', 6, '{"recommendedLength": 200, "keywordSuggestions": ["アフターケア", "保湿", "紫外線"], "avoidExpressions": []}'),
(1, '医師・看護師情報', '施術を行う医師や看護師の情報', 'recommended', 5, '{"recommendedLength": 150, "keywordSuggestions": ["医師", "看護師", "資格"], "avoidExpressions": []}');

-- AGA治療
INSERT INTO genre_specific_items (genre_id, name, description, priority, seo_weight, content_guidelines) VALUES
(2, '治療方法', '内服薬、外用薬、注射等の治療方法', 'required', 9, '{"recommendedLength": 250, "keywordSuggestions": ["内服薬", "外用薬", "注射", "プロペシア", "ミノキシジル"], "avoidExpressions": ["必ず生える", "確実に効果"]}'),
(2, '薬剤種類', '使用する薬剤の種類と効果', 'required', 8, '{"recommendedLength": 200, "keywordSuggestions": ["フィナステリド", "デュタステリド", "ミノキシジル"], "avoidExpressions": ["副作用なし", "100%安全"]}'),
(2, '治療期間', '効果が出るまでの期間', 'required', 7, '{"recommendedLength": 100, "keywordSuggestions": ["期間", "効果", "実感"], "avoidExpressions": ["すぐに", "即効性"]}'),
(2, '副作用情報', '考えられる副作用と対処法', 'required', 6, '{"recommendedLength": 200, "keywordSuggestions": ["副作用", "注意点"], "avoidExpressions": ["副作用なし", "絶対安全"]}'),
(2, '症例写真', '治療前後の写真', 'recommended', 8, '{"recommendedLength": 50, "keywordSuggestions": ["症例", "写真", "before", "after"], "avoidExpressions": ["必ず同じ結果", "確実に同じ効果"]}'),
(2, '専門医情報', '治療を行う専門医の情報', 'recommended', 5, '{"recommendedLength": 150, "keywordSuggestions": ["専門医", "医師", "経験"], "avoidExpressions": []}');

-- 地域マスタのデータ挿入
INSERT INTO regions (name, prefecture, area_code) VALUES
('東京都', '東京都', '03'),
('大阪府', '大阪府', '06'),
('愛知県', '愛知県', '052'),
('神奈川県', '神奈川県', '045'),
('埼玉県', '埼玉県', '048'),
('千葉県', '千葉県', '043'),
('兵庫県', '兵庫県', '078'),
('福岡県', '福岡県', '092');

-- 地域別項目マスタのデータ挿入
INSERT INTO region_specific_items (region_id, name, description, priority) VALUES
(1, '東京都内の店舗・クリニック情報', '東京都内の各店舗・クリニックの詳細情報', 'required'),
(1, '東京都内のアクセス方法', '各店舗・クリニックへの電車・バスでのアクセス', 'required'),
(1, '東京都内の駐車場情報', '車でのアクセス時の駐車場情報', 'recommended'),
(1, '東京都内限定キャンペーン', '東京都内店舗限定のキャンペーン情報', 'optional');

-- 法的コンプライアンスルールのデータ挿入
INSERT INTO compliance_rules (law, description, required_items, prohibited_expressions, required_disclosures, applicable_genres) VALUES
('薬機法', '医薬品、医療機器等の品質、有効性及び安全性の確保等に関する法律', 
 ARRAY['医師監修表示', '効果効能の適切な表現', '体験談の扱い注意'], 
 ARRAY['確実に効果', '必ず改善', '副作用なし', '100%安全'], 
 ARRAY['個人の感想であり効果を保証するものではありません', '医師の診断が必要です'],
 ARRAY['1', '2', '3', '4', '5']),
('景品表示法', '不当景品類及び不当表示防止法', 
 ARRAY['比較根拠の明示', '調査データの出典', '期間限定の根拠'], 
 ARRAY['No.1', '最安値', '業界初', '絶対'], 
 ARRAY['当社調べ', '調査期間と方法を明記'],
 ARRAY['1', '2', '3', '4', '5', '6']);

-- コンプライアンス項目マスタのデータ挿入
INSERT INTO compliance_items (compliance_rule_id, name, description, priority, content_guidelines) VALUES
(1, '医師監修表示', '記事やコンテンツの医師監修を明記', 'required', '{"recommendedLength": 50, "keywordSuggestions": ["医師監修", "専門医", "クリニック"], "avoidExpressions": []}'),
(1, '効果効能の適切な表現', '薬機法に適合した効果効能の表現', 'required', '{"recommendedLength": 100, "keywordSuggestions": ["個人差", "医師の診断"], "avoidExpressions": ["確実", "必ず", "100%"]}'),
(1, '免責事項', '効果を保証しない旨の明記', 'required', '{"recommendedLength": 100, "keywordSuggestions": ["個人の感想", "効果を保証するものではない"], "avoidExpressions": []}'),
(2, '比較根拠の明示', '比較表示の根拠となるデータの明示', 'required', '{"recommendedLength": 150, "keywordSuggestions": ["当社調べ", "調査期間", "調査方法"], "avoidExpressions": ["業界No.1", "最安値"]}'),
(2, '調査データの出典', '使用するデータの出典を明記', 'required', '{"recommendedLength": 100, "keywordSuggestions": ["出典", "調査機関", "調査日"], "avoidExpressions": []}');

-- コンテンツテンプレートのデータ挿入
INSERT INTO content_templates (item_id, item_type, template_type, content, variables) VALUES
(1, 'common', 'html', '<div class="ranking-item"><h3>{{rank}}位 {{name}}</h3><div class="rating">{{rating}}</div><div class="features">{{features}}</div></div>', '{"rank": "number", "name": "string", "rating": "number", "features": "array"}'),
(2, 'common', 'html', '<table class="price-comparison"><thead><tr><th>サービス名</th><th>料金</th><th>特徴</th></tr></thead><tbody>{{rows}}</tbody></table>', '{"rows": "array"}'),
(3, 'common', 'html', '<div class="review-section"><h3>口コミ・評価</h3><div class="reviews">{{reviews}}</div><div class="rating-summary">{{summary}}</div></div>', '{"reviews": "array", "summary": "object"}');

-- コンテンツ例のデータ挿入
INSERT INTO content_examples (template_id, title, content, recommended_length, keyword_suggestions) VALUES
(1, 'ランキング表示例', '<div class="ranking-item"><h3>1位 Aクリニック</h3><div class="rating">4.8</div><div class="features">・最新機器導入・痛み軽減対策・アフターケア充実</div></div>', 100, ARRAY['ランキング', '1位', '評価']),
(2, '料金比較表例', '<table class="price-comparison"><thead><tr><th>クリニック名</th><th>全身脱毛</th><th>特徴</th></tr></thead><tbody><tr><td>Aクリニック</td><td>200,000円</td><td>5回コース</td></tr></tbody></table>', 200, ARRAY['料金', '比較', '全身脱毛']),
(3, '口コミ例', '<div class="review-section"><h3>口コミ・評価</h3><div class="reviews"><div class="review"><p>スタッフの対応が丁寧で安心でした。</p><span class="reviewer">20代女性</span></div></div></div>', 150, ARRAY['口コミ', '評価', 'レビュー']);