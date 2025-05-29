import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row } from '@douyinfe/semi-ui';
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

    // 如果有自定义首页内容，显示原有逻辑
    if (homePageContentLoaded && homePageContent !== '') {
        return (
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
        );
    }

    // 默认显示精美的AI平台首页
    return (
        <div style={{ backgroundColor: 'var(--semi-color-bg-0)' }}>
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
            padding: 60px 20px 48px;
            margin-bottom: 48px;
            background: linear-gradient(135deg, #e6f3ff 0%, #f0f8ff 100%);
            text-align: left;
          }
          
          .hero-container {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .hero-content {
            max-width: 600px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
          }
          
          .hero-title {
            font-size: 2.6rem;
            font-weight: 600;
            line-height: 1.4;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #0078d7, #1e90ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .hero-subtitle {
            font-size: 1.8rem;
            color: #4a5568;
            line-height: 1.4;
            margin-bottom: 24px;
            font-weight: 400;
          }
          
          .section-title {
            font-size: 1.8rem;
            text-align: center;
            margin-bottom: 32px;
            font-weight: 400;
            color: var(--semi-color-text-0);
          }
          
          .service-card {
            height: 280px;
            border-radius: 12px;
            background: #f8fafc;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
            animation: fadeIn 0.6s ease-out forwards;
            display: flex;
            flex-direction: column;
          }
          
          .service-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
          }
          
          .service-card-content {
            padding: 24px;
            text-align: center;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          
          .service-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            transition: transform 0.3s ease;
          }
          
          .service-card:hover .service-icon {
            transform: scale(1.1);
          }
          
          .service-title {
            font-size: 1.4rem;
            margin-bottom: 12px;
            font-weight: 400;
            color: var(--semi-color-text-0);
            min-height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .service-desc {
            color: var(--semi-color-text-1);
            margin-bottom: 16px;
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            line-height: 1.5;
          }
          
          .models-section {
            background: #f8fafc;
            padding: 40px 0;
          }
          
          .model-card {
            border-radius: 12px;
            background: #f8fafc;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            padding: 20px;
            text-align: center;
            height: 100%;
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          .model-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .model-icon {
            width: 48px;
            height: 48px;
            margin: 0 auto 12px;
            transition: transform 0.3s ease;
          }
          
          .model-card:hover .model-icon {
            transform: scale(1.1);
          }
          
          .model-title {
            color: var(--semi-color-text-1);
            font-size: 14px;
          }
          
          .uses-card {
            height: 100%;
            border-radius: 12px;
            background: #f8fafc;
            padding: 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          .uses-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          
          .uses-title {
            font-size: 1.4rem;
            margin-bottom: 12px;
            font-weight: 400;
            color: #0078d7;
            text-align: center;
          }
          
          .uses-desc {
            color: var(--semi-color-text-1);
            text-align: center;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
          }
          
          @media (max-width: 768px) {
            .hero-title {
              font-size: 2.2rem;
            }
            .hero-subtitle {
              font-size: 1.4rem;
            }
            .hero-section {
              padding: 60px 10px 48px;
            }
          }
        `}
            </style>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            {t('一站式人工智能集成平台')}
                        </h1>
                        <h2 className="hero-subtitle">
                            {t('与ChatGPT、Claude、Grok、Gemini、DeepSeek、Qwen等众多人工智能模型互动。')}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="container" style={{ marginBottom: '64px' }}>
                <h3 className="section-title">
                    {t('支持的开源项目')}
                </h3>
                <Row gutter={[24, 24]} type="flex">
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
                            desc: t('支持 ChatGPT、Claude、Grok、Gemini 等大语言模型API调用'),
                            link: "https://www.llmhub.net/token"
                        }
                    ].map((item, index) => (
                        <Col xs={24} sm={12} lg={6} key={index} style={{ display: 'flex' }}>
                            <div
                                className="service-card"
                                style={{ animationDelay: `${index * 0.2}s`, width: '100%' }}
                                onClick={() => item.link && window.open(item.link, '_blank')}
                            >
                                <div className="service-card-content">
                                    <div>
                                        <img src={item.img} alt={item.title} className="service-icon" />
                                        <div className="service-title">{item.title}</div>
                                    </div>
                                    <div className="service-desc">{item.desc}</div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Models Section */}
            <div className="models-section">
                <div className="container">
                    <h3 className="section-title">
                        {t('完美适配众多大语言模型')}
                    </h3>
                    <Row gutter={[16, 16]}>
                        {[
                            { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/openai.svg", title: "ChatGPT", link: "https://openai.com" },
                            { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/claude-color.svg", title: "Claude", link: "https://www.anthropic.com" },
                            { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/gemini-color.svg", title: "Gemini", link: "https://gemini.google.com" },
                            { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/grok.svg", title: "Grok", link: "https://x.ai" },
                            { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/deepseek-color.svg", title: "DeepSeek", link: "https://www.deepseek.com" },
                            { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/qwen-color.svg", title: "通义千问", link: "https://www.aliyun.com/product/bailian" },
                            { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/zhipu-color.svg", title: "智谱GLM", link: "https://www.zhipuai.cn" }
                        ].map((item, index) => (
                            <Col xs={12} sm={8} md={6} lg={Math.floor(24/7)} key={index}>
                                <div
                                    className="model-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                    onClick={() => window.open(item.link, '_blank')}
                                >
                                    <img src={item.img} alt={item.title} className="model-icon" />
                                    <div className="model-title">{item.title}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Uses Section */}
            <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
                <h3 className="section-title">
                    {t('大语言模型的主要用途')}
                </h3>
                <Row gutter={[24, 24]}>
                    {[
                        { title: t('自然语言处理'), desc: t('文本生成、语言翻译、摘要提取、情感分析等。') },
                        { title: t('教育辅助'), desc: t('论文写作、作业辅助、知识问答、编程辅助等。') },
                        { title: t('代码辅助'), desc: t('代码生成、代码补全、代码翻译、代码注释等。') },
                        { title: t('创意生成'), desc: t('图像生成、音频生成、视频生成、设计生成等。') }
                    ].map((item, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                            <div
                                className="uses-card"
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="uses-title">{item.title}</div>
                                <div className="uses-desc">{item.desc}</div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

        </div>
    );
};

export default Home;