import React, { useContext, useEffect, useState } from 'react';
import { API, showError, showNotice } from '../../helpers';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import './styles.css';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');

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
    setHomePageContentLoaded(true);
  };

  useEffect(() => {
    displayNotice().then();
    displayHomePageContent().then();
  }, []);

  if (!homePageContentLoaded) {
    return null;
  }

  return (
      <>
        <section className="hero">
          <div className="text">
            <h1>LLM Hub</h1>
            <h2>大型语言模型集成平台</h2>
            <p>科技改变生活，与我们一起全力加速AIGC时代的到来。</p>
          </div>
        </section>
        <section className="application">
          <h3>我们提供的服务</h3>
          <div className="application-container">
            <div className="application-item">
              <img src="https://docs.openwebui.com/sponsors/sponsor.png" alt="Open WebUI" />
              <h4>Open WebUI</h4>
              <p>可扩展、功能丰富且用户友好的自托管 WebUI</p>
              <a href="https://chat.llmhub.net" className="chat">开始使用</a>
            </div>
            <div className="application-item">
              <img src="https://github.com/binary-husky/gpt_academic/raw/master/docs/logo.png" alt="GPT 学术优化" />
              <h4>GPT 学术优化</h4>
              <p>优化论文阅读/润色/写作体验，支持Python和C++等项目剖析与自译解功能，PDF/LaTex论文翻译与总结</p>
              <a href="https://acad.llmhub.net" className="chat">开始使用</a>
            </div>
            <div className="application-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Dall-e_3_%28jan_%2724%29_artificial_intelligence_icon.png?20240118012653" alt="API" />
              <h4>API服务</h4>
              <p>大语言模型管理系统，支持调用多种大语言模型API</p>
              <a href="https://www.llmhub.net/token" className="chat">开始使用</a>
            </div>
          </div>
        </section>
        <section className="models">
          <h3>完美适配众多大语言模型</h3>
          <div className="grid">
            <div className="grid-item">
              <a href="https://openai.com" target="_blank" rel="noreferrer">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/openai.png" alt="OpenAI ChatGPT" />
                <p>ChatGPT</p>
              </a>
            </div>
            <div className="grid-item">
              <a href="https://www.anthropic.com" target="_blank" rel="noreferrer">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/claude-color.png" alt="Anthropic Claude" />
                <p>Claude</p>
              </a>
            </div>
            <div className="grid-item">
              <a href="https://gemini.google.com" target="_blank" rel="noreferrer">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/gemini-color.png" alt="Google Gemini" />
                <p>Gemini</p>
              </a>
            </div>
            <div className="grid-item">
              <a href="https://www.midjourney.com" target="_blank" rel="noreferrer">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/midjourney.png" alt="Midjourney" />
                <p>Midjourney</p>
              </a>
            </div>
            <div className="grid-item">
              <a href="https://www.aliyun.com/product/bailian" target="_blank" rel="noreferrer">
                <img src="https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/qwen-color.png" alt="通义千问" />
                <p>通义千问</p>
              </a>
            </div>
          </div>
        </section>
        <section className="uses">
          <h3>大语言模型的主要用途</h3>
          <div className="uses-container">
            <div className="uses-item">
              <h4>自然语言处理</h4>
              <p>文本生成、语言翻译、摘要提取、情感分析等。</p>
            </div>
            <div className="uses-item">
              <h4>教育辅助</h4>
              <p>生成个性化学习资料，协助教学和自学。</p>
            </div>
            <div className="uses-item">
              <h4>代码辅助</h4>
              <p>帮助开发者快速编写、优化代码，提高开发效率。</p>
            </div>
            <div className="uses-item">
              <h4>创意生成</h4>
              <p>生成故事、设计概念、市场文案等创意内容。</p>
            </div>
          </div>
        </section>
      </>
  );
};

export default Home;