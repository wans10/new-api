import React from 'react';
import { Card, Typography, Button, Space, Row, Col, Image } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { onOIDCAuthClicked } from 'utils/common';
import './BaseIndex.css'; // 需要创建对应的CSS文件

const { Title, Text, Paragraph } = Typography;

const BaseIndex = () => {
    const { t } = useTranslation();
    const siteInfo = useSelector((state) => state.siteInfo);
    const account = useSelector((state) => state.account);

    // Handle login or console redirect
    const handleActionClick = (event) => {
        event.preventDefault();
        if (account.user) {
            window.location.href = '/panel';
        } else {
            if (siteInfo.oidc_auth) {
                onOIDCAuthClicked();
            } else {
                window.location.href = '/login';
            }
        }
    };

    return (
        <div className="base-index">
            {/* 添加全局动画样式 */}
            <style jsx>{`
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
            `}</style>

            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <Title
                            heading={1}
                            className="hero-title"
                            style={{
                                fontSize: 'clamp(2.2rem, 4vw, 2.6rem)',
                                fontWeight: 600,
                                lineHeight: 1.4,
                                marginBottom: '8px',
                                background: 'linear-gradient(135deg, var(--primary-color, #0078d7), #1e90ff)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}
                        >
                            {t('一站式人工智能集成平台')}
                        </Title>
                        <Title
                            heading={2}
                            className="hero-subtitle"
                            style={{
                                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                                color: 'var(--text-secondary, #4a5568)',
                                lineHeight: 1.4,
                                marginBottom: '24px',
                                fontWeight: 400
                            }}
                        >
                            {t('与ChatGPT、Claude、Grok、Gemini、DeepSeek、Qwen等众多人工智能模型互动。')}
                        </Title>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="services-section">
                <div className="section-container">
                    <Title
                        heading={3}
                        style={{
                            fontSize: '1.8rem',
                            textAlign: 'center',
                            marginBottom: '32px',
                            fontWeight: 400,
                            color: 'var(--semi-color-text-0)'
                        }}
                    >
                        {t('支持的开源项目')}
                    </Title>
                    <Row gutter={[24, 24]}>
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
                            <Col span={6} key={index}>
                                <Card
                                    className="service-card"
                                    style={{
                                        height: '100%',
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        animation: `fadeIn 0.6s ease-out forwards ${index * 0.2}s both`
                                    }}
                                    bodyStyle={{
                                        textAlign: 'center',
                                        padding: '24px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%'
                                    }}
                                >
                                    <div
                                        className="service-icon"
                                        style={{
                                            marginBottom: '20px',
                                            transition: 'transform 0.3s ease'
                                        }}
                                    >
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            preview={false}
                                            style={{ transition: 'transform 0.3s ease' }}
                                        />
                                    </div>
                                    <Title
                                        heading={5}
                                        style={{
                                            fontSize: '1.4rem',
                                            marginBottom: '12px',
                                            fontWeight: 400
                                        }}
                                    >
                                        {item.title}
                                    </Title>
                                    <Text
                                        type="secondary"
                                        style={{
                                            marginBottom: '16px',
                                            flex: 1
                                        }}
                                    >
                                        {item.desc}
                                    </Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Models Section */}
            <div className="models-section">
                <div className="section-container">
                    <Title
                        heading={3}
                        style={{
                            fontSize: '1.8rem',
                            textAlign: 'center',
                            marginBottom: '32px',
                            fontWeight: 400,
                            color: 'var(--semi-color-text-0)'
                        }}
                    >
                        {t('完美适配众多大语言模型')}
                    </Title>
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
                            <Col span={24/7} key={index}>
                                <Card
                                    className="model-card"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '20px',
                                        height: '100%',
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        animation: `fadeIn 0.6s ease-out forwards ${index * 0.1}s both`
                                    }}
                                    bodyStyle={{
                                        padding: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100%'
                                    }}
                                >
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textDecoration: 'none',
                                            color: 'inherit'
                                        }}
                                    >
                                        <div style={{ marginBottom: '12px' }}>
                                            <Image
                                                src={item.img}
                                                alt={item.title}
                                                width={48}
                                                height={48}
                                                preview={false}
                                                style={{ transition: 'transform 0.3s ease' }}
                                            />
                                        </div>
                                        <Text type="secondary" style={{ textAlign: 'center' }}>
                                            {item.title}
                                        </Text>
                                    </a>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            {/* Uses Section */}
            <div className="uses-section">
                <div className="section-container">
                    <Title
                        heading={3}
                        style={{
                            fontSize: '1.8rem',
                            textAlign: 'center',
                            marginBottom: '32px',
                            fontWeight: 400,
                            color: 'var(--semi-color-text-0)'
                        }}
                    >
                        {t('大语言模型的主要用途')}
                    </Title>
                    <Row gutter={[24, 24]}>
                        {[
                            { title: t('自然语言处理'), desc: t('文本生成、语言翻译、摘要提取、情感分析等。') },
                            { title: t('教育辅助'), desc: t('论文写作、作业辅助、知识问答、编程辅助等。') },
                            { title: t('代码辅助'), desc: t('代码生成、代码补全、代码翻译、代码注释等。') },
                            { title: t('创意生成'), desc: t('图像生成、音频生成、视频生成、设计生成等。') }
                        ].map((item, index) => (
                            <Col span={6} key={index}>
                                <Card
                                    className="use-card"
                                    style={{
                                        height: '100%',
                                        borderRadius: '12px',
                                        backgroundColor: '#f8fafc',
                                        padding: '24px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        animation: `fadeIn 0.6s ease-out forwards ${index * 0.15}s both`
                                    }}
                                    bodyStyle={{
                                        textAlign: 'center',
                                        padding: 0
                                    }}
                                >
                                    <Title
                                        heading={5}
                                        style={{
                                            fontSize: '1.4rem',
                                            marginBottom: '12px',
                                            fontWeight: 400,
                                            color: '#0078d7'
                                        }}
                                    >
                                        {item.title}
                                    </Title>
                                    <Text type="secondary">
                                        {item.desc}
                                    </Text>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default BaseIndex;