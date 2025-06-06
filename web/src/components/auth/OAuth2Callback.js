import React, { useContext, useEffect, useState } from 'react';
import { Spin, Typography, Space } from '@douyinfe/semi-ui';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API, showError, showSuccess, updateAPI, setUserData } from '../../helpers';
import { UserContext } from '../../context/User';

const OAuth2Callback = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [userState, userDispatch] = useContext(UserContext);
  const [prompt, setPrompt] = useState('处理中...');
  const [processing, setProcessing] = useState(true);

  let navigate = useNavigate();

  const sendCode = async (code, state, count) => {
    const res = await API.get(
      `/api/oauth/${props.type}?code=${code}&state=${state}`,
    );
    const { success, message, data } = res.data;
    if (success) {
      if (message === 'bind') {
        showSuccess('绑定成功！');
        navigate('/setting');
      } else {
        userDispatch({ type: 'login', payload: data });
        localStorage.setItem('user', JSON.stringify(data));
        setUserData(data);
        updateAPI();
        showSuccess('登录成功！');
        navigate('/token');
      }
    } else {
      showError(message);
      if (count === 0) {
        setPrompt(`操作失败，重定向至登录界面中...`);
        navigate('/setting'); // in case this is failed to bind GitHub
        return;
      }
      count++;
      setPrompt(`出现错误，第 ${count} 次重试中...`);
      await new Promise((resolve) => setTimeout(resolve, count * 2000));
      await sendCode(code, state, count);
    }
  };

  useEffect(() => {
    let code = searchParams.get('code');
    let state = searchParams.get('state');
    sendCode(code, state, 0).then();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[300px] w-full bg-white rounded-lg shadow p-6">
      <Space vertical align="center">
        <Spin size="large" spinning={processing}>
          <div className="min-h-[200px] min-w-[200px] flex items-center justify-center">
            <Typography.Text type="secondary">{prompt}</Typography.Text>
          </div>
        </Spin>
      </Space>
    </div>
  );
};

export default OAuth2Callback;
