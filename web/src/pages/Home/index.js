import React, { useContext } from 'react';
import { Row, Col, Card, Typography, Space } from '@douyinfe/semi-ui';
import { StatusContext } from '../../context/Status';
import { StyleContext } from '../../context/Style/index.js';
import { useTranslation } from 'react-i18next';
import './styles.css'; // 引入外部 CSS 文件

const Home = () => {
  const { t } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const [styleState] = useContext(StyleContext);

  return (
      <div style={{ backgroundColor: 'var(--semi-color-bg-0, #fff)' }}>
        {/* Hero Section */}
        <div
            className="hero-section"
            style={{
              position: 'relative',
              padding: '60px 20px',
              marginBottom: 48,
              backgroundColor: 'var(--primary-light, #e6f3ff)',
              textAlign: 'left',
            }}
        >
          <div
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                padding: '0 20px',
              }}
          >
            <div
                style={{
                  maxWidth: 600,
                  margin: '0 auto',
                  position: 'relative',
                  zIndex: 1,
                }}
            >
              <Typography.Title
                  heading={1}
                  style={{
                    fontSize: '2.6rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                    marginBottom: 8,
                    background: 'linear-gradient(135deg, var(--primary-color, #0078d7), #1e90ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
              >
                {t('一站式人工智能集成平台')}
              </Typography.Title>
              <Typography.Text
                  style={{
                    fontSize: '1.8rem',
                    color: 'var(--semi-color-text-1, #4a5568)',
                    lineHeight: 1.4,
                    marginBottom: 12,
                  }}
              >
                {t('与ChatGPT、Claude、Grok、Gemini、DeepSeek、Qwen等众多人工智能模型互动。')}
              </Typography.Text>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 64, padding: '0 20px' }}>
          <Typography.Title
              heading={3}
              style={{
                fontSize: '1.8rem',
                textAlign: 'center',
                marginBottom: 32,
                fontWeight: 400,
                color: 'var(--semi-color-text-0)',
              }}
          >
            {t('支持的开源项目')}
          </Typography.Title>
          <Row gutter={24}>
            {[
              {
                img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/cline.svg",
                title: "Cline",
                desc: t('IDE 中的自主编码代理'),
              },
              {
                img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/cursor.svg",
                title: "Cursor",
                desc: t('使用 AI 编写代码的最佳方式'),
              },
              {
                img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/1.46.0/files/icons/n8n.svg",
                title: "n8n",
                desc: t('为技术团队提供灵活的 AI 工作流程自动化'),
              },
              {
                img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/dify-color.svg",
                title: "Dify",
                desc: t('开源的 LLM 应用开发平台'),
              },
              {
                img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/gradio-color.svg",
                title: t('GPT学术优化'),
                desc: t('优化论文阅读/润色/写作体验'),
                link: "https://acad.llmhub.com.cn",
              },
              {
                img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/lobehub-color.svg",
                title: "Lobe Chat",
                desc: t('现代化设计的开源 ChatGPT/LLMs 聊天应用与开发框架'),
                link: "https://lobe.llmhub.com.cn",
              },
              {
                img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/openwebui.svg",
                title: "Open WebUI",
                desc: t('可扩展、功能丰富且用户友好的自托管WebUI'),
                link: "https://open.llmhub.com.cn",
              },
              {
                img: "/favicon.ico",
                title: t('API服务'),
                desc: t('支持多种模型，包括ChatGPT、Claude、Grok、Gemini等大语言模型API调用'),
                link: "https://www.llmhub.net/token",
              },
            ].map((item, index) => (
                <Col xs={24} sm={12} lg={6} key={index} className="fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Card
                      bordered
                      style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 12,
                        backgroundColor: '#f8fafc',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                      }}
                      className="card-hover"
                  >
                    <Space vertical align="center" style={{ flexGrow: 1, padding: 24, textAlign: 'center' }}>
                      <div
                          style={{
                            marginBottom: 20,
                            overflow: 'hidden',
                          }}
                          className="image-container"
                      >
                        <img
                            src={item.img}
                            alt={item.title}
                            style={{ width: 80, height: 80, transition: 'transform 0.3s ease' }}
                        />
                      </div>
                      <Typography.Title heading={5} style={{ fontSize: '1.4rem', marginBottom: 12, fontWeight: 400 }}>
                        {item.title}
                      </Typography.Title>
                      <Typography.Text style={{ color: 'var(--semi-color-text-1)', marginBottom: 16 }}>
                        {item.desc}
                      </Typography.Text>
                    </Space>
                  </Card>
                </Col>
            ))}
          </Row>
        </div>

        {/* Models Section */}
        <div style={{ backgroundColor: '#f8fafc', padding: '40px 20px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
            <Typography.Title
                heading={3}
                style={{
                  fontSize: '1.8rem',
                  textAlign: 'center',
                  marginBottom: 32,
                  fontWeight: 400,
                  color: 'var(--semi-color-text-0)',
                }}
            >
              {t('完美适配众多大语言模型')}
            </Typography.Title>
            <Row gutter={16}>
              {[
                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/openai.svg", title: "ChatGPT", link: "https://openai.com" },
                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/claude-color.svg", title: "Claude", link: "https://www.anthropic.com" },
                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/gemini-color.svg", title: "Gemini", link: "https://gemini.google.com" },
                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/grok.svg", title: "Grok", link: "https://x.ai" },
                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/deepseek-color.svg", title: "DeepSeek", link: "https://www.deepseek.com" },
                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/qwen-color.svg", title: "通义千问", link: "https://www.aliyun.com/product/bailian" },
                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/zhipu-color.svg", title: "智谱GLM", link: "https://www.zhipuai.cn" },
              ].map((item, index) => (
                  <Col xs={12} sm={8} md={6} lg={4} key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <Card
                        bordered
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          padding: 20,
                          height: '100%',
                          borderRadius: 12,
                          backgroundColor: '#f8fafc',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          transition: 'all 0.3s ease',
                        }}
                        className="card-hover"
                    >
                      <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                          }}
                      >
                        <div
                            style={{
                              marginBottom: 12,
                              overflow: 'hidden',
                            }}
                            className="image-container"
                        >
                          <img
                              src={item.img}
                              alt={item.title}
                              style={{ width: 48, height: 48, transition: 'transform 0.3s ease' }}
                          />
                        </div>
                        <Typography.Text style={{ color: 'var(--semi-color-text-1)', textAlign: 'center' }}>
                          {item.title}
                        </Typography.Text>
                      </a>
                    </Card>
                  </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* Uses Section */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
          <Typography.Title
              heading={3}
              style={{
                fontSize: '1.8rem',
                textAlign: 'center',
                marginBottom: 32,
                fontWeight: 400,
                color: 'var(--semi-color-text-0)',
              }}
          >
            {t('大语言模型的主要用途')}
          </Typography.Title>
          <Row gutter={24}>
            {[
              { title: t('自然语言处理'), desc: t('文本生成、语言翻译、摘要提取、情感分析等。') },
              { title: t('教育辅助'), desc: t('论文写作、作业辅助、知识问答、编程辅助等。') },
              { title: t('代码辅助'), desc: t('代码生成、代码补全、代码翻译、代码注释等。') },
              { title: t('创意生成'), desc: t('图像生成、音频生成、视频生成、设计生成等。') },
            ].map((item, index) => (
                <Col xs={24} sm={12} md={6} key={index} className="fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                  <Card
                      bordered
                      style={{
                        height: '100%',
                        borderRadius: 12,
                        backgroundColor: '#f8fafc',
                        padding: 24,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                      }}
                      className="card-hover"
                  >
                    <Space vertical align="center" style={{ textAlign: 'center' }}>
                      <Typography.Title
                          heading={5}
                          style={{
                            fontSize: '1.4rem',
                            marginBottom: 12,
                            fontWeight: 400,
                            color: '#0078d7',
                          }}
                      >
                        {item.title}
                      </Typography.Title>
                      <Typography.Text style={{ color: 'var(--semi-color-text-1)' }}>
                        {item.desc}
                      </Typography.Text>
                    </Space>
                  </Card>
                </Col>
            ))}
          </Row>
        </div>
      </div>
  );
};

export default Home;