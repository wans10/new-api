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

    // 新增的现代化首页内容组件
    const ModernHomePage = () => {
        return (
            <div style={{ backgroundColor: 'var(--semi-color-bg-0)' }}>
                {/* 添加动画样式 */}
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
            .fade-in-card {
              animation: fadeIn 0.6s ease-out forwards;
            }
            .hover-lift {
              transition: all 0.3s ease;
            }
            .hover-lift:hover {
              transform: translateY(-5px);
              box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            }
            .hover-scale img {
              transition: transform 0.3s ease;
            }
            .hover-scale:hover img {
              transform: scale(1.1);
            }
            .gradient-text {
              background: linear-gradient(135deg, #0078d7, #1e90ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
          `}
                </style>

                {/* Hero Section */}
                <div style={{
                    position: 'relative',
                    padding: '60px 20px 48px',
                    marginBottom: '48px',
                    backgroundColor: '#e6f3ff',
                    textAlign: 'center'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        <h1 style={{
                            fontSize: '2.6rem',
                            fontWeight: 600,
                            lineHeight: 1.4,
                            marginBottom: '8px',
                            background: 'linear-gradient(135deg, #0078d7, #1e90ff)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: '0 0 8px 0'
                        }}>
                            {t('一站式人工智能集成平台')}
                        </h1>
                        <h2 style={{
                            fontSize: '1.8rem',
                            color: '#4a5568',
                            lineHeight: 1.4,
                            marginBottom: '24px',
                            fontWeight: 400,
                            margin: '0'
                        }}>
                            {t('与ChatGPT、Claude、Grok、Gemini、DeepSeek、Qwen等众多人工智能模型互动。')}
                        </h2>
                    </div>
                </div>

                {/* Services Section */}
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', marginBottom: '64px' }}>
                    <h3 style={{
                        fontSize: '1.8rem',
                        textAlign: 'center',
                        marginBottom: '32px',
                        fontWeight: 400,
                        color: 'var(--semi-color-text-0)'
                    }}>
                        {t('支持的开源项目')}
                    </h3>
                    <Row gutter={24}>
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
                            <Col span={6} key={index}>
                                <Card
                                    className="fade-in-card hover-lift"
                                    style={{
                                        height: '100%',
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        animationDelay: `${index * 0.2}s`,
                                        border: 'none'
                                    }}
                                    bodyStyle={{
                                        padding: '24px',
                                        textAlign: 'center',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div className="hover-scale" style={{ marginBottom: '20px' }}>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            style={{
                                                width: '80px',
                                                height: '80px'
                                            }}
                                        />
                                    </div>
                                    <h5 style={{
                                        fontSize: '1.4rem',
                                        marginBottom: '12px',
                                        fontWeight: 400,
                                        color: 'var(--semi-color-text-0)'
                                    }}>
                                        {item.title}
                                    </h5>
                                    <p style={{
                                        color: 'var(--semi-color-text-1)',
                                        fontSize: '14px',
                                        lineHeight: 1.5,
                                        margin: 0,
                                        flex: 1
                                    }}>
                                        {item.desc}
                                    </p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Models Section */}
                <div style={{ backgroundColor: '#f8fafc', padding: '40px 0' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                        <h3 style={{
                            fontSize: '1.8rem',
                            textAlign: 'center',
                            marginBottom: '32px',
                            fontWeight: 400,
                            color: 'var(--semi-color-text-0)'
                        }}>
                            {t('完美适配众多大语言模型')}
                        </h3>
                        <Row gutter={16}>
                            {[
                                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/openai.svg", title: "ChatGPT" },
                                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/claude-color.svg", title: "Claude" },
                                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/gemini-color.svg", title: "Gemini" },
                                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/grok.svg", title: "Grok" },
                                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/deepseek-color.svg", title: "DeepSeek" },
                                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/qwen-color.svg", title: "通义千问" },
                                { img: "https://registry.npmmirror.com/@lobehub/icons-static-svg/latest/files/icons/zhipu-color.svg", title: "智谱GLM" }
                            ].map((item, index) => (
                                <Col span={24/7} key={index}>
                                    <Card
                                        className="fade-in-card hover-lift"
                                        style={{
                                            borderRadius: '12px',
                                            backgroundColor: '#ffffff',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            animationDelay: `${index * 0.1}s`,
                                            border: 'none',
                                            height: '120px'
                                        }}
                                        bodyStyle={{
                                            padding: '20px',
                                            textAlign: 'center',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <div className="hover-scale" style={{ marginBottom: '12px' }}>
                                            <img
                                                src={item.img}
                                                alt={item.title}
                                                style={{
                                                    width: '48px',
                                                    height: '48px'
                                                }}
                                            />
                                        </div>
                                        <p style={{
                                            color: 'var(--semi-color-text-1)',
                                            fontSize: '14px',
                                            margin: 0
                                        }}>
                                            {item.title}
                                        </p>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>

                {/* Uses Section */}
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                    <h3 style={{
                        fontSize: '1.8rem',
                        textAlign: 'center',
                        marginBottom: '32px',
                        fontWeight: 400,
                        color: 'var(--semi-color-text-0)'
                    }}>
                        {t('大语言模型的主要用途')}
                    </h3>
                    <Row gutter={24}>
                        {[
                            { title: t('自然语言处理'), desc: t('文本生成、语言翻译、摘要提取、情感分析等。') },
                            { title: t('教育辅助'), desc: t('论文写作、作业辅助、知识问答、编程辅助等。') },
                            { title: t('代码辅助'), desc: t('代码生成、代码补全、代码翻译、代码注释等。') },
                            { title: t('创意生成'), desc: t('图像生成、音频生成、视频生成、设计生成等。') }
                        ].map((item, index) => (
                            <Col span={6} key={index}>
                                <Card
                                    className="fade-in-card hover-lift"
                                    style={{
                                        height: '180px',
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        animationDelay: `${index * 0.15}s`,
                                        border: 'none'
                                    }}
                                    bodyStyle={{
                                        padding: '24px',
                                        textAlign: 'center',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <h5 style={{
                                        fontSize: '1.4rem',
                                        marginBottom: '12px',
                                        fontWeight: 400,
                                        color: '#0078d7'
                                    }}>
                                        {item.title}
                                    </h5>
                                    <p style={{
                                        color: 'var(--semi-color-text-1)',
                                        fontSize: '14px',
                                        lineHeight: 1.5,
                                        margin: 0
                                    }}>
                                        {item.desc}
                                    </p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        );
    };

    return (
        <>
            {homePageContentLoaded && homePageContent === '' ? (
                <ModernHomePage />
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