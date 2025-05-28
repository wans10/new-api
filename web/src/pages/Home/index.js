import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Button, Typography, Space } from '@douyinfe/semi-ui';
import { API, showError, showNotice, timestamp2string } from '../../helpers';
import { StatusContext } from '../../context/Status';
import { marked } from 'marked';
import { StyleContext } from '../../context/Style/index.js';
import { useTranslation } from 'react-i18next';

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

  // 定义内联样式
  const styles = {
    container: {
      background: 'var(--semi-color-bg-0)',
      minHeight: '100vh'
    },
    heroSection: {
      background: 'linear-gradient(135deg, var(--semi-color-primary-light-default, #e6f3ff) 0%, var(--semi-color-bg-1) 100%)',
      padding: '60px 24px',
      marginBottom: '48px',
      borderRadius: '12px',
      margin: '0 24px 48px 24px',
      position: 'relative',
      overflow: 'hidden'
    },
    heroTitle: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      marginBottom: '16px',
      background: 'linear-gradient(135deg, var(--semi-color-primary, #0078d7), #1e90ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textAlign: 'center'
    },
    heroSubtitle: {
      fontSize: '1.2rem',
      color: 'var(--semi-color-text-1)',
      lineHeight: 1.6,
      marginBottom: '32px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto 32px auto'
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: 500,
      textAlign: 'center',
      marginBottom: '32px',
      color: 'var(--semi-color-text-0)'
    },
    modernCard: {
      borderRadius: '16px',
      background: 'var(--semi-color-bg-1)',
      border: '1px solid var(--semi-color-border)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      overflow: 'hidden'
    },
    cardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      borderColor: 'var(--semi-color-primary-light-default)'
    },
    serviceCard: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px',
      textAlign: 'center'
    },
    serviceIcon: {
      width: '64px',
      height: '64px',
      margin: '0 auto 16px auto',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--semi-color-primary-light-default)',
      fontSize: '2rem'
    },
    modelCard: {
      padding: '20px',
      textAlign: 'center',
      minHeight: '120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modelIcon: {
      width: '48px',
      height: '48px',
      marginBottom: '12px',
      borderRadius: '8px'
    },
    useCaseCard: {
      padding: '24px',
      textAlign: 'center',
      height: '100%'
    },
    fadeIn: {
      animation: 'fadeInUp 0.6s ease-out forwards'
    }
  };

  // 添加CSS动画
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .modern-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        border-color: var(--semi-color-primary-light-default);
      }
      
      .service-icon:hover {
        transform: scale(1.1);
        transition: transform 0.3s ease;
      }
      
      .model-icon:hover {
        transform: scale(1.1);
        transition: transform 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // 支持的服务数据
  const services = [
    {
      icon: '🤖',
      title: 'Cline',
      desc: t('IDE 中的自主编码代理'),
      link: 'https://cline.bot'
    },
    {
      icon: '⚡',
      title: 'Cursor',
      desc: t('使用 AI 编写代码的最佳方式'),
      link: 'https://cursor.sh'
    },
    {
      icon: '🔄',
      title: 'n8n',
      desc: t('为技术团队提供灵活的 AI 工作流程自动化'),
      link: 'https://n8n.io'
    },
    {
      icon: '🚀',
      title: 'Dify',
      desc: t('开源的 LLM 应用开发平台'),
      link: 'https://dify.ai'
    },
    {
      icon: '📚',
      title: t('GPT学术优化'),
      desc: t('优化论文阅读/润色/写作体验'),
      link: 'https://acad.llmhub.com.cn'
    },
    {
      icon: '💬',
      title: 'Lobe Chat',
      desc: t('现代化设计的开源 ChatGPT/LLMs 聊天应用与开发框架'),
      link: 'https://lobe.llmhub.com.cn'
    },
    {
      icon: '🌐',
      title: 'Open WebUI',
      desc: t('可扩展、功能丰富且用户友好的自托管WebUI'),
      link: 'https://open.llmhub.com.cn'
    },
    {
      icon: '🔗',
      title: t('API服务'),
      desc: t('支持多种模型，包括ChatGPT、Claude、Grok、Gemini等大语言模型API调用'),
      link: 'https://www.llmhub.net/token'
    }
  ];

  // 支持的模型数据
  const models = [
    { name: 'ChatGPT', icon: '🤖', link: 'https://openai.com' },
    { name: 'Claude', icon: '🧠', link: 'https://www.anthropic.com' },
    { name: 'Gemini', icon: '💎', link: 'https://gemini.google.com' },
    { name: 'Grok', icon: '🚀', link: 'https://x.ai' },
    { name: 'DeepSeek', icon: '🔍', link: 'https://www.deepseek.com' },
    { name: '通义千问', icon: '💭', link: 'https://www.aliyun.com/product/bailian' },
    { name: '智谱GLM', icon: '⚡', link: 'https://www.zhipuai.cn' }
  ];

  // 用途数据
  const useCases = [
    {
      title: t('自然语言处理'),
      desc: t('文本生成、语言翻译、摘要提取、情感分析等。'),
      icon: '📝'
    },
    {
      title: t('教育辅助'),
      desc: t('论文写作、作业辅助、知识问答、编程辅助等。'),
      icon: '🎓'
    },
    {
      title: t('代码辅助'),
      desc: t('代码生成、代码补全、代码翻译、代码注释等。'),
      icon: '💻'
    },
    {
      title: t('创意生成'),
      desc: t('图像生成、音频生成、视频生成、设计生成等。'),
      icon: '🎨'
    }
  ];

  return (
      <div style={styles.container}>
        {homePageContentLoaded && homePageContent === '' ? (
            <>
              {/* Hero Section */}
              <div style={styles.heroSection}>
                <div style={styles.heroTitle}>
                  {t('一站式人工智能集成平台')}
                </div>
                <div style={styles.heroSubtitle}>
                  {t('与ChatGPT、Claude、Grok、Gemini、DeepSeek、Qwen等众多人工智能模型互动。')}
                </div>
              </div>

              {/* Services Section */}
              <div style={{ padding: '0 24px', marginBottom: '64px' }}>
                <Typography.Title level={2} style={styles.sectionTitle}>
                  {t('支持的开源项目')}
                </Typography.Title>
                <Row gutter={[24, 24]}>
                  {services.map((service, index) => (
                      <Col span={6} key={index}>
                        <Card
                            className="modern-card"
                            style={{ ...styles.modernCard, ...styles.fadeIn, animationDelay: `${index * 0.1}s` }}
                            bodyStyle={styles.serviceCard}
                        >
                          <div className="service-icon" style={styles.serviceIcon}>
                            {service.icon}
                          </div>
                          <Typography.Title level={4} style={{ marginBottom: '8px', color: 'var(--semi-color-text-0)' }}>
                            {service.title}
                          </Typography.Title>
                          <Typography.Text type="secondary" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                            {service.desc}
                          </Typography.Text>
                        </Card>
                      </Col>
                  ))}
                </Row>
              </div>

              {/* Models Section */}
              <div style={{
                background: 'var(--semi-color-fill-0)',
                padding: '64px 24px',
                marginBottom: '64px'
              }}>
                <Typography.Title level={2} style={styles.sectionTitle}>
                  {t('完美适配众多大语言模型')}
                </Typography.Title>
                <Row gutter={[16, 16]} style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {models.map((model, index) => (
                      <Col span={24/7} key={index}>
                        <Card
                            className="modern-card"
                            style={{ ...styles.modernCard, ...styles.fadeIn, animationDelay: `${index * 0.1}s` }}
                            bodyStyle={styles.modelCard}
                        >
                          <div className="model-icon" style={{ ...styles.modelIcon, fontSize: '2rem' }}>
                            {model.icon}
                          </div>
                          <Typography.Text style={{ fontSize: '14px', color: 'var(--semi-color-text-1)' }}>
                            {model.name}
                          </Typography.Text>
                        </Card>
                      </Col>
                  ))}
                </Row>
              </div>

              {/* Use Cases Section */}
              <div style={{ padding: '0 24px', marginBottom: '64px' }}>
                <Typography.Title level={2} style={styles.sectionTitle}>
                  {t('大语言模型的主要用途')}
                </Typography.Title>
                <Row gutter={[24, 24]}>
                  {useCases.map((useCase, index) => (
                      <Col span={6} key={index}>
                        <Card
                            className="modern-card"
                            style={{ ...styles.modernCard, ...styles.fadeIn, animationDelay: `${index * 0.15}s` }}
                            bodyStyle={styles.useCaseCard}
                        >
                          <div style={{ ...styles.serviceIcon, marginBottom: '16px', fontSize: '2.5rem' }}>
                            {useCase.icon}
                          </div>
                          <Typography.Title level={4} style={{
                            marginBottom: '12px',
                            color: 'var(--semi-color-primary)'
                          }}>
                            {useCase.title}
                          </Typography.Title>
                          <Typography.Text type="secondary" style={{ fontSize: '14px', lineHeight: 1.5 }}>
                            {useCase.desc}
                          </Typography.Text>
                        </Card>
                      </Col>
                  ))}
                </Row>
              </div>

              {/* System Status Section */}
              <div style={{ padding: '0 24px' }}>
                <Typography.Title level={2} style={styles.sectionTitle}>
                  {t('系统状况')}
                </Typography.Title>
                <Row gutter={24}>
                  <Col span={12}>
                    <Card
                        title={t('系统信息')}
                        style={styles.modernCard}
                        headerExtraContent={
                          <span style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>
                      {t('系统信息总览')}
                    </span>
                        }
                    >
                      <Space direction="vertical" spacing="loose" style={{ width: '100%' }}>
                        <div>
                          <Typography.Text strong>{t('名称')}：</Typography.Text>
                          <Typography.Text>{statusState?.status?.system_name}</Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('版本')}：</Typography.Text>
                          <Typography.Text>
                            {statusState?.status?.version ? statusState?.status?.version : 'unknown'}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('源码')}：</Typography.Text>
                          <Typography.Link
                              href='https://github.com/Calcium-Ion/new-api'
                              target='_blank'
                          >
                            https://github.com/Calcium-Ion/new-api
                          </Typography.Link>
                        </div>
                        <div>
                          <Typography.Text strong>{t('协议')}：</Typography.Text>
                          <Typography.Link
                              href='https://www.apache.org/licenses/LICENSE-2.0'
                              target='_blank'
                          >
                            Apache-2.0 License
                          </Typography.Link>
                        </div>
                        <div>
                          <Typography.Text strong>{t('启动时间')}：</Typography.Text>
                          <Typography.Text>{getStartTimeString()}</Typography.Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                        title={t('系统配置')}
                        style={styles.modernCard}
                        headerExtraContent={
                          <span style={{ fontSize: '12px', color: 'var(--semi-color-text-2)' }}>
                      {t('系统配置总览')}
                    </span>
                        }
                    >
                      <Space direction="vertical" spacing="loose" style={{ width: '100%' }}>
                        <div>
                          <Typography.Text strong>{t('邮箱验证')}：</Typography.Text>
                          <Typography.Text type={statusState?.status?.email_verification === true ? 'success' : 'tertiary'}>
                            {statusState?.status?.email_verification === true ? t('已启用') : t('未启用')}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('GitHub 身份验证')}：</Typography.Text>
                          <Typography.Text type={statusState?.status?.github_oauth === true ? 'success' : 'tertiary'}>
                            {statusState?.status?.github_oauth === true ? t('已启用') : t('未启用')}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('OIDC 身份验证')}：</Typography.Text>
                          <Typography.Text type={statusState?.status?.oidc_enabled === true ? 'success' : 'tertiary'}>
                            {statusState?.status?.oidc_enabled === true ? t('已启用') : t('未启用')}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('微信身份验证')}：</Typography.Text>
                          <Typography.Text type={statusState?.status?.wechat_login === true ? 'success' : 'tertiary'}>
                            {statusState?.status?.wechat_login === true ? t('已启用') : t('未启用')}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('Turnstile 用户校验')}：</Typography.Text>
                          <Typography.Text type={statusState?.status?.turnstile_check === true ? 'success' : 'tertiary'}>
                            {statusState?.status?.turnstile_check === true ? t('已启用') : t('未启用')}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('Telegram 身份验证')}：</Typography.Text>
                          <Typography.Text type={statusState?.status?.telegram_oauth === true ? 'success' : 'tertiary'}>
                            {statusState?.status?.telegram_oauth === true ? t('已启用') : t('未启用')}
                          </Typography.Text>
                        </div>
                        <div>
                          <Typography.Text strong>{t('Linux DO 身份验证')}：</Typography.Text>
                          <Typography.Text type={statusState?.status?.linuxdo_oauth === true ? 'success' : 'tertiary'}>
                            {statusState?.status?.linuxdo_oauth === true ? t('已启用') : t('未启用')}
                          </Typography.Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                </Row>
              </div>
            </>
        ) : (
            <>
              {homePageContent.startsWith('https://') ? (
                  <iframe
                      src={homePageContent}
                      style={{ width: '100%', height: '100vh', border: 'none' }}
                  />
              ) : (
                  <div
                      style={{ fontSize: 'larger', padding: '24px' }}
                      dangerouslySetInnerHTML={{ __html: homePageContent }}
                  ></div>
              )}
            </>
        )}
      </div>
  );
};

export default Home;