'use client';

import { useEffect, useState } from 'react';

const GOOGLE_CLIENT_ID = '35125519641-lubljhc670hl669qb4u70km61dklc42u.apps.googleusercontent.com';

interface User {
  email: string;
  name: string;
  picture: string;
}

export default function GoogleLogin({ onLogin }: { onLogin: (user: User) => void }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 检查本地存储
    const stored = localStorage.getItem('user');
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
      onLogin(userData);
      return;
    }

    // 等待 Google SDK 加载
    const checkGoogle = setInterval(() => {
      const google = (window as any).google;
      if (google?.accounts?.id) {
        clearInterval(checkGoogle);
        
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: (response: any) => {
            const userInfo = JSON.parse(atob(response.credential.split('.')[1]));
            const userData = {
              email: userInfo.email,
              name: userInfo.name,
              picture: userInfo.picture,
            };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            onLogin(userData);
          },
        });

        const btn = document.getElementById('googleBtn');
        if (btn) {
          google.accounts.id.renderButton(btn, { 
            theme: 'outline', 
            size: 'large', 
            text: 'signin_with', 
            locale: 'zh_CN' 
          });
        }
      }
    }, 100);

    return () => clearInterval(checkGoogle);
  }, [onLogin]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4 mb-8 justify-center">
        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
        <span className="text-gray-700">{user.name}</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          退出
        </button>
      </div>
    );
  }

  return (
    <div className="text-center mb-8">
      <div id="googleBtn" className="inline-block"></div>
      <p className="text-sm text-gray-500 mt-2">登录后可使用背景移除功能</p>
    </div>
  );
}
