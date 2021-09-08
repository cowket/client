import React from 'react';
import { AuthLayout } from 'layout/AuthLayout';
import RegisterForm from 'components/RegisterForm';
import LoginForm from 'components/LoginForm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  const needAuth = true;
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route>
            {/* 인증결과에따라 다른 layout을 보여줌 */}
            {needAuth ? (
              <AuthLayout>
                <Route path="/register" exact component={RegisterForm} />
                <Route path="/login" exact component={LoginForm} />
                {/* <Redirect from="/" to="/login" /> */}
              </AuthLayout>
            ) : (
              <div>dd</div>
            )}
          </Route>
        </Switch>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
