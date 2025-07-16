-- リスティング広告ランキングサイト項目生成システム データベーススキーマ

-- 共通項目マスタ
CREATE TABLE common_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('required', 'recommended', 'optional')),
    seo_weight INTEGER DEFAULT 0,
    content_guidelines JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ジャンルマスタ
CREATE TABLE genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('medical', 'beauty', 'fitness', 'general')),
    seo_keywords TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ジャンル別専門項目マスタ
CREATE TABLE genre_specific_items (
    id SERIAL PRIMARY KEY,
    genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('required', 'recommended', 'optional')),
    seo_weight INTEGER DEFAULT 0,
    content_guidelines JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 地域マスタ
CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    prefecture VARCHAR(100),
    area_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 地域別項目マスタ
CREATE TABLE region_specific_items (
    id SERIAL PRIMARY KEY,
    region_id INTEGER REFERENCES regions(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('required', 'recommended', 'optional')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 法的コンプライアンスルール
CREATE TABLE compliance_rules (
    id SERIAL PRIMARY KEY,
    law VARCHAR(50) NOT NULL CHECK (law IN ('薬機法', '景品表示法', '個人情報保護法')),
    description TEXT,
    required_items TEXT[],
    prohibited_expressions TEXT[],
    required_disclosures TEXT[],
    applicable_genres INTEGER[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- コンプライアンス項目マスタ
CREATE TABLE compliance_items (
    id SERIAL PRIMARY KEY,
    compliance_rule_id INTEGER REFERENCES compliance_rules(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('required', 'recommended', 'optional')),
    content_guidelines JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- コンテンツテンプレート
CREATE TABLE content_templates (
    id SERIAL PRIMARY KEY,
    item_id INTEGER,
    item_type VARCHAR(50) NOT NULL CHECK (item_type IN ('common', 'genre_specific', 'region_specific', 'compliance')),
    template_type VARCHAR(20) NOT NULL CHECK (template_type IN ('html', 'text', 'structured')),
    content TEXT NOT NULL,
    variables JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- コンテンツ例
CREATE TABLE content_examples (
    id SERIAL PRIMARY KEY,
    template_id INTEGER REFERENCES content_templates(id) ON DELETE CASCADE,
    title VARCHAR(255),
    content TEXT NOT NULL,
    recommended_length INTEGER,
    keyword_suggestions TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ユーザーカスタマイズ設定
CREATE TABLE user_customizations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    project_name VARCHAR(255) NOT NULL,
    selected_genres INTEGER[],
    selected_regions INTEGER[],
    selected_items JSONB,
    custom_items JSONB,
    settings JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- インデックス作成
CREATE INDEX idx_common_items_priority ON common_items(priority);
CREATE INDEX idx_genre_specific_items_genre_id ON genre_specific_items(genre_id);
CREATE INDEX idx_region_specific_items_region_id ON region_specific_items(region_id);
CREATE INDEX idx_compliance_items_rule_id ON compliance_items(compliance_rule_id);
CREATE INDEX idx_content_templates_item_id_type ON content_templates(item_id, item_type);
CREATE INDEX idx_user_customizations_user_id ON user_customizations(user_id);

-- 更新日時の自動更新のためのトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 各テーブルに更新日時トリガーを設定
CREATE TRIGGER update_common_items_updated_at BEFORE UPDATE ON common_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_genres_updated_at BEFORE UPDATE ON genres FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_genre_specific_items_updated_at BEFORE UPDATE ON genre_specific_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_regions_updated_at BEFORE UPDATE ON regions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_region_specific_items_updated_at BEFORE UPDATE ON region_specific_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_rules_updated_at BEFORE UPDATE ON compliance_rules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_items_updated_at BEFORE UPDATE ON compliance_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_templates_updated_at BEFORE UPDATE ON content_templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_examples_updated_at BEFORE UPDATE ON content_examples FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_customizations_updated_at BEFORE UPDATE ON user_customizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();