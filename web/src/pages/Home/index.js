import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Typography } from '@douyinfe/semi-ui';
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

    return (
        <>
            <style>
                {`
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
          .hero-section {
            position: relative;
            padding: 60px 20px;
            background-color: #e6f3ff;
            text-align: left;
          }
          .hero-container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .hero-content {
            max-width: 600px;
            margin: 0 auto;
          }
          .hero-title {
            font-size: 2.6rem;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #0078d7, #1e90ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .hero-subtitle {
            font-size: 1.8rem;
            color: #4a5568;
            line-height: 1.4;
            margin-bottom: 12px;
            font-weight: 400;
          }
          .section-title {
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 32px;
            font-weight: 400;
            color: #1f2329;
          }
          .service-card, .model-card, .use-card {
            height: 100%;
            background-color: #f8fafc;
            border-radius: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          .service-card:hover, .model-card:hover, .use-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
          }
          .service-card img, .model-card img {
            width: 80px;
            height: 80px;
            transition: transform 0.3s ease;
          }
          .service-card:hover img, .model-card:hover img {
            transform: scale(1.1);
          }
          .model-card img {
            width: 48px;
            height: 48px;
          }
          @media (max-width: 600px) {
            .hero-title {
              font-size: 2.2rem;
            }
            .hero-subtitle {
              font-size: 1.4rem;
            }
            .hero-section {
              padding: 40px 10px;
            }
          }
        `}
            </style>
            {homePageContentLoaded && homePageContent === '' ? (
                <>
                    {/* Hero Section */}
                    <div className="hero-section">
                        <div className="hero-container">
                            <div className="hero-content">
                                <Typography.Title heading={1} className="hero-title">
                                    {t('一站式人工智能集成平台')}
                                </Typography.Title>
                                <Typography.Text className="hero-subtitle">
                                    {t('与ChatGPT、Claude、Grok、Gemini、DeepSeek、Qwen等众多人工智能模型互动。')}
                                </Typography.Text>
                            </div>
                        </div>
                    </div>

                    {/* Services Section */}
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                        <Typography.Title heading={3} className="section-title">
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
                                    link: "https://acad.llmhub.com.cn"
                                },
                                {
                                    img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/lobehub-color.svg",
                                    title: "Lobe Chat",
                                    desc: t('现代化设计的开源 ChatGPT/LLMs 聊天应用与开发框架'),
                                    link: "https://lobe.llmhub.com.cn"
                                },
                                {
                                    img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/openwebui.svg",
                                    title: "Open WebUI",
                                    desc: t('可扩展、功能丰富且用户友好的自托管WebUI'),
                                    link: "https://open.llmhub.com.cn"
                                },
                                {
                                    img: "/favicon.ico",
                                    title: t('API服务'),
                                    desc: t('支持多种模型，包括ChatGPT、Claude、Grok、Gemini等大语言模型API调用'),
                                    link: "https://www.llmhub.net/token"
                                }
                            ].map((item, index) => (
                                <Col xs={24} sm={12} lg={6} key={index} style={{ animation: `fadeIn 0.6s ease-out forwards`, animationDelay: `${index * 0.2}s` }}>
                                    <Card className="service-card" bodyStyle={{ textAlign: 'center', padding: '24px' }}>
                                        <img src={item.img} alt={item.title} />
                                        <Typography.Title heading={5} style={{ margin: '12px 0', fontWeight: 400 }}>
                                            {item.title}
                                        </Typography.Title>
                                        <Typography.Text style={{ color: '#6b7280' }}>
                                            {item.desc}
                                        </Typography.Text>
                                        {item.link && (
                                            <Typography.Link href={item.link} target="_blank" style={{ marginTop: '12px', display: 'block' }}>
                                                {t('了解更多')}
                                            </Typography.Link>
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Models Section */}
                    <div style={{ backgroundColor: '#f8fafc', padding: '40px 20px' }}>
                        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            <Typography.Title heading={3} className="section-title">
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
                                    { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/zhipu-color.svg", title: "智谱GLM", link: "https://www.zhipuai.cn" }
                                ].map((item, index) => (
                                    <Col xs={12} sm={8} md={6} lg={4} key={index} style={{ animation: `fadeIn 0.6s ease-out forwards`, animationDelay: `${index * 0.1}s` }}>
                                        <Card className="model-card" bodyStyle={{ textAlign: 'center', padding: '20px' }}>
                                            <Typography.Link href={item.link} target="_blank">
                                                <img src={item.img} alt={item.title} />
                                                <Typography.Text style={{ color: '#6b7280', display: 'block', marginTop: '12px' }}>
                                                    {item.title}
                                                </Typography.Text>
                                            </Typography.Link>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>

                    {/* Uses Section */}
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                        <Typography.Title heading={3} className="section-title">
                            {t('大语言模型的主要用途')}
                        </Typography.Title>
                        <Row gutter={24}>
                            {[
                                { title: t('自然语言处理'), desc: t('文本生成、语言翻译、摘要提取、情感分析等。') },
                                { title: t('教育辅助'), desc: t('论文写作、作业辅助、知识问答、编程辅助等。') },
                                { title: t('代码辅助'), desc: t('代码生成、代码补全、代码翻译、代码注释等。') },
                                { title: t('创意生成'), desc: t('图像生成、音频生成、视频生成、设计生成等。') }
                            ].map((item, index) => (
                                <Col xs={24} sm={12} md={6} key={index} style={{ animation: `fadeIn 0.6s ease-out forwards`, animationDelay: `${index * 0.15}s` }}>
                                    <Card className="use-card" bodyStyle={{ textAlign: 'center', padding: '24px' }}>
                                        <Typography.Title heading={5} style={{ marginBottom: '12px', fontWeight: 400, color: '#0078d7' }}>
                                            {item.title}
                                        </Typography.Title>
                                        <Typography.Text style={{ color: '#6b7280' }}>
                                            {item.desc}
                                        </Typography.Text>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* System Status (Original index.js content) */}
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                        <Card
                            bordered={false}
                            headerLine={false}
                            title={t('系统状况')}
                            bodyStyle={{ padding: '10px 20px' }}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Card
                                        title={t('系统信息')}
                                        headerExtraContent={
                                            <Typography.Text style={{ fontSize: '12px', color: 'var(--semi-color-text-1)' }}>
                                                {t('系统信息总览')}
                                            </Typography.Text>
                                        }
                                    >
                                        <Typography.Text>
                                            {t('名称')}：{statusState?.status?.system_name}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('版本')}：{statusState?.status?.version || 'unknown'}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('源码')}：
                                            <Typography.Link href='https://github.com/Calcium-Ion/new-api' target='_blank'>
                                                https://github.com/Calcium-Ion/new-api
                                            </Typography.Link>
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('协议')}：
                                            <Typography.Link href='https://www.apache.org/licenses/LICENSE-2.0' target='_blank'>
                                                Apache-2.0 License
                                            </Typography.Link>
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('启动时间')}：{getStartTimeString()}
                                        </Typography.Text>
                                    </Card>
                                </Col>
                                <Col span={12}>
                                    <Card
                                        title={t('系统配置')}
                                        headerExtraContent={
                                            <Typography.Text style={{ fontSize: '12px', color: 'var(--semi-color-text-1)' }}>
                                                {t('系统配置总览')}
                                            </Typography.Text>
                                        }
                                    >
                                        <Typography.Text>
                                            {t('邮箱验证')}：{statusState?.status?.email_verification ? t('已启用') : t('未启用')}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('GitHub 身份验证')}：{statusState?.status?.github_oauth ? t('已启用') : t('未启用')}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('OIDC 身份验证')}：{statusState?.status?.oidc_enabled ? t('已启用') : t('未启用')}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('微信身份验证')}：{statusState?.status?.wechat_login ? t('已启用') : t('未启用')}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('Turnstile 用户校验')}：{statusState?.status?.turnstile_check ? t('已启用') : t('未启用')}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('Telegram 身份验证')}：{statusState?.status?.telegram_oauth ? t('已启用') : t('未启用')}
                                        </Typography.Text><br />
                                        <Typography.Text>
                                            {t('Linux DO 身份验证')}：{statusState?.status?.linuxdo_oauth ? t('已启用') : t('未启用')}
                                        </Typography.Text>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
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
                            style={{ fontSize: 'larger', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
                            dangerouslySetInnerHTML={{ __html: homePageContent }}
                        ></div>
                    )}
                </>
            )}
        </>
    );
};

export default Home;