import React, { useState } from 'react';
import AuthLayout from 'layout/AuthLayout';
import BaseLayout from 'layout/BaseLayout';
import Chat from 'pages/Chat';
import Team from 'pages/Team';
import AuthContext from 'context/auth';
import RegisterForm from 'components/RegisterForm';
import LoginForm from 'components/LoginForm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          {/* 인증결과에따라 다른 layout을 보여줌 */}
          {isLoggedIn ? (
            <BaseLayout>
              <Route path="/team" component={Team} />
              <Route path="/chat/:teamId?/:channelId?" component={Chat} />
            </BaseLayout>
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
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
