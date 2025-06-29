import React from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';
import { LayoutOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Text } = Typography;

interface LayoutPublicProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const LayoutPublic: React.FC<LayoutPublicProps> = ({ children, title = 'Welcome Back', subtitle = 'Sign in to your account to continue' }) => {
  return (
    <StyledLayout>
      <Content>
        <LayoutContainer>
          <LayoutCard>
            <LogoSection>
              <LogoIcon>
                <LayoutOutlined />
              </LogoIcon>
              <WelcomeText>
                <Title level={2} style={{ margin: 0, color: '#333' }}>
                  {title}
                </Title>
              </WelcomeText>
              <SubtitleText>
                <Text type='secondary'>{subtitle}</Text>
              </SubtitleText>
            </LogoSection>

            {children}

            <FooterText>
              <Text type='secondary'>© 2024 Your Company. All rights reserved.</Text>
            </FooterText>
          </LayoutCard>
        </LayoutContainer>
      </Content>
    </StyledLayout>
  );
};

export default LayoutPublic;
const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const LayoutCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 48px;
  width: 100%;
  max-width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
`;

const LogoIcon = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
  font-size: 28px;
`;

const WelcomeText = styled.div`
  text-align: center;
  margin-bottom: 8px;
`;

const SubtitleText = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 32px;
`;

const FooterText = styled.div`
  text-align: center;
  margin-top: 32px;
  color: #999;
  font-size: 12px;
`;
