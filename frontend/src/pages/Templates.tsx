import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

const TemplatesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const TemplateCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const TemplateHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TemplateTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const TemplateDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin: 0;
`;

const TemplateContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ContentExample = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ExampleTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

const ExampleContent = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  white-space: pre-wrap;
`;

const GuidelineBox = styled.div`
  background-color: #f8fafc;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const GuidelineTitle = styled.h5`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

const GuidelineList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const CodeBlock = styled.pre`
  background-color: #1e293b;
  color: #e2e8f0;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow-x: auto;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  examples: Array<{
    title: string;
    content: string;
    recommendedLength: string;
    keywords: string[];
  }>;
  htmlTemplate: string;
  guidelines: string[];
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        // Mock data for demonstration - in real app would use templatesApi
        const mockTemplates: Template[] = [
          {
            id: '1',
            name: 'ランキング表示',
            description: '各サービスのランキング形式での表示テンプレート',
            category: 'common',
            examples: [
              {
                title: '医療脱毛クリニックランキング',
                content: `第1位：〇〇クリニック
総合評価：★★★★★ 4.8/5.0
・料金の安さ：★★★★☆
・効果の高さ：★★★★★
・通いやすさ：★★★★★
・スタッフの対応：★★★★★

第2位：△△美容外科
総合評価：★★★★☆ 4.5/5.0
...`,
                recommendedLength: '200-400文字',
                keywords: ['ランキング', '比較', '評価', 'クリニック名']
              }
            ],
            htmlTemplate: `<div class="ranking-item">
  <div class="rank-number">第{{rank}}位</div>
  <h3 class="clinic-name">{{name}}</h3>
  <div class="rating">
    <span class="score">{{score}}/5.0</span>
    <div class="stars">{{stars}}</div>
  </div>
  <ul class="features">
    {{#each features}}
    <li>{{this}}</li>
    {{/each}}
  </ul>
</div>`,
            guidelines: [
              '客観的な根拠に基づいたランキングを作成する',
              '比較基準を明確に記載する',
              '個人の感想と客観的事実を区別する',
              '景品表示法に配慮した表現を使用する'
            ]
          },
          {
            id: '2',
            name: '料金比較表',
            description: 'サービス料金の比較表示テンプレート',
            category: 'common',
            examples: [
              {
                title: '医療脱毛料金比較',
                content: `全身脱毛5回コース料金比較

〇〇クリニック：198,000円
・顔・VIO込み：298,000円
・月額：3,400円〜

△△美容外科：228,000円
・顔・VIO込み：328,000円
・月額：4,400円〜

※料金は税込表示
※2024年1月時点の情報`,
                recommendedLength: '150-300文字',
                keywords: ['料金', '比較', 'コース', '税込', '月額']
              }
            ],
            htmlTemplate: `<table class="price-comparison">
  <thead>
    <tr>
      <th>クリニック名</th>
      <th>基本料金</th>
      <th>オプション料金</th>
      <th>月額</th>
    </tr>
  </thead>
  <tbody>
    {{#each clinics}}
    <tr>
      <td>{{name}}</td>
      <td>{{basePrice}}</td>
      <td>{{optionPrice}}</td>
      <td>{{monthlyPrice}}</td>
    </tr>
    {{/each}}
  </tbody>
</table>`,
            guidelines: [
              '税込・税抜を明確に記載する',
              '比較条件を統一する',
              '追加料金の有無を明記する',
              '更新日時を記載する'
            ]
          }
        ];
        setTemplates(mockTemplates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'テンプレートの読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  if (loading) {
    return (
      <TemplatesContainer>
        <LoadingSpinner />
      </TemplatesContainer>
    );
  }

  return (
    <TemplatesContainer>
      <Title>テンプレート・コンテンツ例</Title>
      <Description>
        各項目の具体的なコンテンツ例とHTMLテンプレートを確認できます。
        推奨文字数、使用すべきキーワード、避けるべき表現も含まれています。
      </Description>

      {error && <ErrorMessage message={error} />}

      <TemplateGrid>
        {templates.map((template) => (
          <TemplateCard key={template.id}>
            <TemplateHeader>
              <TemplateTitle>{template.name}</TemplateTitle>
              <TemplateDescription>{template.description}</TemplateDescription>
            </TemplateHeader>

            <TemplateContent>
              {template.examples.map((example, index) => (
                <ContentExample key={index}>
                  <ExampleTitle>{example.title}</ExampleTitle>
                  <ExampleContent>{example.content}</ExampleContent>
                  
                  <GuidelineBox>
                    <GuidelineTitle>コンテンツガイドライン</GuidelineTitle>
                    <GuidelineList>
                      <li>推奨文字数: {example.recommendedLength}</li>
                      <li>推奨キーワード: {example.keywords.join(', ')}</li>
                    </GuidelineList>
                  </GuidelineBox>
                </ContentExample>
              ))}

              <ContentExample>
                <ExampleTitle>HTMLテンプレート</ExampleTitle>
                <CodeBlock>{template.htmlTemplate}</CodeBlock>
              </ContentExample>

              <GuidelineBox>
                <GuidelineTitle>作成時の注意点</GuidelineTitle>
                <GuidelineList>
                  {template.guidelines.map((guideline, index) => (
                    <li key={index}>{guideline}</li>
                  ))}
                </GuidelineList>
              </GuidelineBox>
            </TemplateContent>
          </TemplateCard>
        ))}
      </TemplateGrid>
    </TemplatesContainer>
  );
};

export default Templates;