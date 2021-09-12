import React from 'react';
import AuthLayout from 'layout/AuthLayout';
import BaseLayout from 'layout/BaseLayout';
import Chat from 'pages/Chat';
import Team from 'pages/Team';
import RegisterForm from 'components/RegisterForm';
import LoginForm from 'components/LoginForm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  const needAuth = false;
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* 인증결과에따라 다른 layout을 보여줌 */}
        {needAuth ? (
          <AuthLayout>
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
            </Switch>
          </AuthLayout>
        ) : (
          <BaseLayout>
            <Route path="/team" component={Team} />
            <Route path="/chat/:teamId?/:channelId?" component={Chat} />
          </BaseLayout>
        )}
        <Route exact path="/">
          {needAuth ? <Redirect to="/login" /> : <Redirect to="/chat" />}
        </Route>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
