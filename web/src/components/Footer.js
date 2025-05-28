import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getFooterHTML, getSystemName } from '../helpers';
import { Layout, Tooltip } from '@douyinfe/semi-ui';
import { StyleContext } from '../context/Style/index.js';

const FooterBar = () => {
  const { t } = useTranslation();
  const systemName = getSystemName();
  const [footer, setFooter] = useState(getFooterHTML());
  const [styleState] = useContext(StyleContext);
  let remainCheckTimes = 5;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const defaultFooter = '© 2025 llmhub.com.cn 版权所有  <a href="https://beian.miit.gov.cn/" target="_blank">津ICP备2025029271号-1</a>  <img src="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png" width="20"/> <a href="https://beian.mps.gov.cn/#/query/webSearch?code=33010902004083" rel="noreferrer" target="_blank">浙公网安备33010902004083号</a>';


    useEffect(() => {
    const timer = setInterval(() => {
      if (remainCheckTimes <= 0) {
        clearInterval(timer);
        return;
      }
      remainCheckTimes--;
      loadFooter();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        textAlign: 'center',
        paddingBottom: '5px',
      }}
    >
      {footer ? (
        <div
          className='custom-footer'
          dangerouslySetInnerHTML={{ __html: footer }}
        ></div>
      ) : (
        defaultFooter
      )}
    </div>
  );
};

export default FooterBar;
