import { Button, Col, Input, Row, Spin } from 'antd';
import { FormItem, openNotification } from '../../components';
import { FormProviderWrapper } from '../../components/form/form-provider-wrapper';
import { useHookForm } from '../../components/form/hooks/use-hook-form';
import { handleApiError, yup } from '../../helpers';
import styled from 'styled-components';
import { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import LayoutPublic from '../layout/layout-public';
import { authService } from '../../swagger-api';
import { AuthEmailLoginDto } from '../../swagger-api/gen/data-contracts';
import { setTokens } from '../../swagger-api/axios';
import { useNavigate } from 'react-router-dom';

const { Password } = Input;

export const SignInContainer = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const { methods, handleSubmit, isValid } = useHookForm({
    schema: schema,
  });

  const onSubmit = async (data: AuthEmailLoginDto) => {
    try {
      const resLogin = await authService.authControllerLogin(data);

      if (resLogin.status === 200 && resLogin.data) {
        // Check if response has the expected structure
        const { token, refreshToken } = resLogin.data;

        if (token && refreshToken) {
          setTokens(token, refreshToken);
          openNotification('success', 'Login successful! Welcome back!');
          // Redirect to dashboard or home page
          navigate('/manage-tasks');
        } else {
          openNotification('error', 'Invalid response format from server');
        }
      } else {
        openNotification('error', 'Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutPublic title='Management task platform' subtitle='Sign in to your account to continue'>
      <Spin spinning={loading}>
        <StyledForm>
          <Row>
            <FormProviderWrapper methods={methods}>
              <FormItem
                label='Email'
                element={<StyledInput prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} placeholder='Enter your email' size='large' />}
                name='email'
              />

              <FormItem
                label='Password'
                element={
                  <StyledPassword
                    prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                    placeholder='Enter your password'
                    size='large'
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                }
                name='password'
              />
              <Col style={{ padding: 16 }}>
                <StyledButton type='primary' size='large' block onClick={handleSubmit(onSubmit)} disabled={!isValid}>
                  Sign In
                </StyledButton>
              </Col>
            </FormProviderWrapper>
          </Row>
        </StyledForm>
      </Spin>
    </LayoutPublic>
  );
};

const StyledForm = styled.div`
  .ant-form-item {
    margin-bottom: 24px;
  }

  .ant-input-affix-wrapper {
    border-radius: 8px;
    height: 48px;
  }

  .ant-btn {
    height: 48px;
    border-radius: 8px;
    font-weight: 600;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
`;

const StyledPassword = styled(Password)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 24px;
`;
