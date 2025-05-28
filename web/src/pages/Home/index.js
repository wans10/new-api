import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Space, Divider } from '@douyinfe/semi-ui';
import { API, showError, showNotice, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';
import { StyleContext } from '../../context/Style/index.js';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [styleState, styleDispatch] = useContext(StyleContext);

  const displayNotice = async () => {
    const res = await API.get('/api/notice');
    const { success, message, data } = res.data;
    if (success) {
      let oldNotice = localStorage.getItem('notice');
      if (data !== oldNotice && data !== '') {
        const htmlNotice = marked(data);
        showNotice(htmlNotice, true);
        localStorage.setItem('notice', data);
      }
    } else {
      showError(message);
    }
  };

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          const theme = localStorage.getItem('theme-mode') || 'light';
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: theme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const getStartTimeString = () => {
    const timestamp = statusState?.status?.start_time;
    return statusState.status ? timestamp2string(timestamp) : '';
  };

  useEffect(() => {
    displayNotice().then();
    displayHomePageContent().then();
  }, []);

  // 内联样式
  const styles = {
    fadeIn: {
      animation: 'fadeIn 0.6s ease-out forwards'
    },
    heroSection: {
      position: 'relative',
      padding: '60px 20px',
      marginBottom: '48px',
      background: 'linear-gradient(135deg, #e6f3ff 0%, #f0f8ff 100%)',
      borderRadius: '12px'
    },
    heroTitle: {
      fontSize: '2.6rem',
      fontWeight: 600,
      lineHeight: 1.4,
      marginBottom: '8px',
      background: 'linear-gradient(135deg, #0078d7, #1e90ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'left'
    },
    heroSubtitle: {
      fontSize: '1.8rem',
      color: '#4a5568',
      lineHeight: 1.4,
      marginBottom: '24px',
      fontWeight: 400,
      textAlign: 'left'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      textAlign: 'center',
      marginBottom: '32px',
      fontWeight: 400
    },
    serviceCard: {
      height: '100%',
      borderRadius: '12px',
      background: '#f8fafc',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    serviceCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
    },
    serviceIcon: {
      width: '80px',
      height: '80px',
      margin: '0 auto 20px',
      transition: 'transform 0.3s ease'
    },
    modelCard: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      height: '100%',
      borderRadius: '12px',
      background: '#f8fafc',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    modelIcon: {
      width: '48px',
      height: '48px',
      marginBottom: '12px',
      transition: 'transform 0.3s ease'
    },
    useCaseCard: {
      height: '100%',
      borderRadius: '12px',
      background: '#f8fafc',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    useCaseTitle: {
      fontSize: '1.4rem',
      marginBottom: '12px',
      fontWeight: 400,
      color: '#0078d7',
      textAlign: 'center'
    }
  };

  // 添加全局样式
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .service-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1) !important;
      }
      .service-card:hover img {
        transform: scale(1.1) !important;
      }
      .model-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }
      .model-card:hover img {
        transform: scale(1.1) !important;
      }
      .use-case-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
      }
    `;
    document.head.appendChild(styleElement);
    return () => document.head.removeChild(styleElement);
  }, []);

  return (
      <>
        {homePageContentLoaded && homePageContent === '' ? (
            <div>
              {/* Hero Section */}
              <div style={styles.heroSection}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <Title level={1} style={styles.heroTitle}>
                    {t('一站式人工智能集成平台')}
                  </Title>
                  <Title level={2} style={styles.heroSubtitle}>
                    {t('与ChatGPT、Claude、Grok、Gemini、DeepSeek、Qwen等众多人工智能模型互动。')}
                  </Title>
                </div>
              </div>

              {/* Services Section */}
              <div style={{ marginBottom: '64px' }}>
                <Title level={3} style={styles.sectionTitle}>
                  {t('支持的开源项目')}
                </Title>
                <Row gutter={[24, 24]}>
                  {[
                    {
                      img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/cline.svg",
                      title: "Cline",
                      desc: t('IDE 中的自主编码代理')
                    },
                    {
                      img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/cursor.svg",
                      title: "Cursor",
                      desc: t('使用 AI 编写代码的最佳方式')
                    },
                    {
                      img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/1.46.0/files/icons/n8n.svg",
                      title: "n8n",
                      desc: t('为技术团队提供灵活的 AI 工作流程自动化')
                    },
                    {
                      img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/dify-color.svg",
                      title: "Dify",
                      desc: t('开源的 LLM 应用开发平台')
                    },
                    {
                      img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/gradio-color.svg",
                      title: t('GPT学术优化'),
                      desc: t('优化论文阅读/润色/写作体验')
                    },
                    {
                      img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/lobehub-color.svg",
                      title: "Lobe Chat",
                      desc: t('现代化设计的开源 ChatGPT/LLMs 聊天应用与开发框架')
                    },
                    {
                      img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/openwebui.svg",
                      title: "Open WebUI",
                      desc: t('可扩展、功能丰富且用户友好的自托管WebUI')
                    },
                    {
                      img: "/favicon.ico",
                      title: t('API服务'),
                      desc: t('支持多种模型，包括ChatGPT、Claude、Grok、Gemini等大语言模型API调用')
                    }
                  ].map((item, index) => (
                      <Col xs={24} sm={12} lg={6} key={index}>
                        <Card
                            className="service-card"
                            style={{
                              ...styles.serviceCard,
                              animationDelay: `${index * 0.2}s`,
                              ...styles.fadeIn
                            }}
                            bodyStyle={{ padding: '24px', textAlign: 'center' }}
                        >
                          <div style={styles.serviceIcon}>
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%' }} />
                          </div>
                          <Title level={4} style={{ fontSize: '1.4rem', marginBottom: '12px', fontWeight: 400 }}>
                            {item.title}
                          </Title>
                          <Paragraph style={{ color: '#64748b', marginBottom: '16px' }}>
                            {item.desc}
                          </Paragraph>
                        </Card>
                      </Col>
                  ))}
                </Row>
              </div>

              {/* Models Section */}
              <div style={{ background: '#f8fafc', padding: '40px 0', borderRadius: '12px', marginBottom: '64px' }}>
                <Title level={3} style={styles.sectionTitle}>
                  {t('完美适配众多大语言模型')}
                </Title>
                <Row gutter={[16, 16]} style={{ padding: '0 24px' }}>
                  {[
                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/openai.svg", title: "ChatGPT" },
                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/claude-color.svg", title: "Claude" },
                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/gemini-color.svg", title: "Gemini" },
                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/grok.svg", title: "Grok" },
                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/deepseek-color.svg", title: "DeepSeek" },
                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/qwen-color.svg", title: "通义千问" },
                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/zhipu-color.svg", title: "智谱GLM" }
                  ].map((item, index) => (
                      <Col xs={12} sm={8} md={6} lg={Math.floor(24/7)} key={index}>
                        <Card
                            className="model-card"
                            style={{
                              ...styles.modelCard,
                              animationDelay: `${index * 0.1}s`,
                              ...styles.fadeIn
                            }}
                            bodyStyle={{ padding: '20px', textAlign: 'center' }}
                        >
                          <div style={styles.modelIcon}>
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%' }} />
                          </div>
                          <Text style={{ color: '#64748b', textAlign: 'center' }}>
                            {item.title}
                          </Text>
                        </Card>
                      </Col>
                  ))}
                </Row>
              </div>

              {/* Uses Section */}
              <div style={{ marginBottom: '64px' }}>
                <Title level={3} style={styles.sectionTitle}>
                  {t('大语言模型的主要用途')}
                </Title>
                <Row gutter={[24, 24]}>
                  {[
                    { title: t('自然语言处理'), desc: t('文本生成、语言翻译、摘要提取、情感分析等。') },
                    { title: t('教育辅助'), desc: t('论文写作、作业辅助、知识问答、编程辅助等。') },
                    { title: t('代码辅助'), desc: t('代码生成、代码补全、代码翻译、代码注释等。') },
                    { title: t('创意生成'), desc: t('图像生成、音频生成、视频生成、设计生成等。') }
                  ].map((item, index) => (
                      <Col xs={24} sm={12} md={6} key={index}>
                        <Card
                            className="use-case-card"
                            style={{
                              ...styles.useCaseCard,
                              animationDelay: `${index * 0.15}s`,
                              ...styles.fadeIn
                            }}
                            bodyStyle={{ padding: '24px', textAlign: 'center' }}
                        >
                          <Title level={4} style={styles.useCaseTitle}>
                            {item.title}
                          </Title>
                          <Paragraph style={{ color: '#64748b' }}>
                            {item.desc}
                          </Paragraph>
                        </Card>
                      </Col>
                  ))}
                </Row>
              </div>

            </div>
        ) : (
            <>
              {homePageContent.startsWith('https://') ? (
                  <iframe
                      src={homePageContent}
                      style={{ width: '100%', height: '100vh', border: 'none' }}
                  />
              ) : (
                  <div
                      style={{ fontSize: 'larger' }}
                      dangerouslySetInnerHTML={{ __html: homePageContent }}
                  ></div>
              )}
            </>
        )}
      </>
  );
};

export default Home;