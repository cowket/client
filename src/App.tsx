import React, { useState, useEffect } from 'react';
import AuthLayout from 'layout/AuthLayout';
import BaseLayout from 'layout/BaseLayout';
import Chat from 'pages/Chat';
import Team from 'pages/Team';
import { postLoginByToken } from 'api/auth';
import SelectContext from 'context/select';
import AuthContext from 'context/auth';
import TeamContext from 'context/team';
import UserContext from 'context/user';
import RegisterForm from 'components/RegisterForm';
import LoginForm from 'components/LoginForm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [teamList, setTeamList] = useState<Team[]>([]);
  const [userInfo, setUserInfo] = useState<UserDetail>();
  const [selectedTeam, setSelectedTeam] = useState<Team>();
  const [selectedChannel, setSelectedChannel] = useState<string>();
  const refreshUserInfo = async (refreshToken: string) => {
    const userInfo = await postLoginByToken(refreshToken);
    if (userInfo?.statusCode === 401) {
      setIsLoggedIn(false);
      localStorage.removeItem('cowket-token');
    } else if (userInfo) {
      setUserInfo(userInfo);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    // localstorage에 토큰이 있는경우 토큰을 사용해 로그인
    const refreshToken = localStorage.getItem('cowket-token');
    if (refreshToken && !isLoggedIn) {
      refreshUserInfo(refreshToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {/* 인증결과에따라 다른 layout을 보여줌 */}
            {isLoggedIn ? (
              <TeamContext.Provider value={{ teamList, setTeamList }}>
                <SelectContext.Provider
                  value={{
                    selectedTeam,
                    selectedChannel,
                    setSelectedTeam,
                    setSelectedChannel,
                  }}
                >
                  <BaseLayout>
                    <Route path="/team" component={Team} />
                    <Route path="/chat" component={Chat} />
                  </BaseLayout>
                </SelectContext.Provider>
              </TeamContext.Provider>
            ) : (
              <AuthLayout>
                <Switch>
                  <Route path="/register" component={RegisterForm} />
                  <Route path="/login" component={LoginForm} />
                </Switch>
              </AuthLayout>
            )}
            <Route exact path="*">
              {isLoggedIn ? <Redirect to="/chat" /> : <Redirect to="/login" />}
            </Route>
          </UserContext.Provider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
