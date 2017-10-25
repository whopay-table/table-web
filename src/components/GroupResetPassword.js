import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import Alert from 'src/components/common/Alert';
import Bar from 'src/components/common/Bar';
import BarItem from 'src/components/common/BarItem';
import Button from 'src/components/common/Button';
import Container from 'src/components/common/Container';
import ContentGroup from 'src/components/common/ContentGroup';
import Header from 'src/components/Header';
import Label from 'src/components/common/Label';
import Title from 'src/components/common/Title';
import Text from 'src/components/common/Text';
import Textbox from 'src/components/common/Textbox';

export default class GroupResetPassword extends Component {
  handleSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    const { resetUserPassword } = this.props;
    resetUserPassword();
  }

  render() {
    const {
      groupname,
      email,
      alert,
      setEmail,
      isSucceed,
    } = this.props;

    console.log('isSucceed', isSucceed);

    const alertBlock = alert ? (
      <ContentGroup>
        <Alert
          role="danger"
        >
          {alert}
        </Alert>
      </ContentGroup>
    ) : null;

    const succeedBlock = isSucceed ? (
      <ContentGroup>
        <Alert
          role="success"
        >
          입력하신 email 주소로 새로운 비밀번호가 전송 되었습니다.
          확인 후 새로운 비밀번호를 사용해 로그인 해주세요.
        </Alert>
      </ContentGroup>
    ) : null;

    const buttons = isSucceed ? (
      <ContentGroup>
        <Bar>
          <BarItem align="left">
            <Button
              to={`/${groupname}`}
            >
              돌아가기
            </Button>
          </BarItem>
        </Bar>
      </ContentGroup>
    ) : (
      <ContentGroup>
        <Bar>
          <BarItem align="left">
            <Button
              type="submit"
            >
              확인
            </Button>
          </BarItem>
          <BarItem align="left">
            <Button
              to={`/${groupname}`}
              role="warning"
            >
              취소
            </Button>
          </BarItem>
        </Bar>
      </ContentGroup>
    );

    return (
      <Container
        className="c-group-user-destroy"
        type="wrapper"
        isHeadered={true}
      >
        <Header />
        <Container>
          <ContentGroup>
            <Title>
              {groupname} 그룹의 사용자 비밀번호를 재설정합니다.
            </Title>
          </ContentGroup>
          <ContentGroup>
            <Text size="small">
              아래에 이메일 주소를 입력하고 비밀번호를 재설정하게 되면,
              해당 사용자에게 임의의 새로운 비밀번호가 부여되고
              이메일로 새 비밀번호가 전송됩니다.
            </Text>
          </ContentGroup>
          <ContentGroup>
            <form
              onSubmit={e => this.handleSubmit(e)}
            >
              <ContentGroup size="small">
                <Label>
                  Email
                </Label>
                <Textbox
                  type="text"
                  onChange={e => this.props.setEmail(e.target.value)}
                  value={email}
                />
                <Text size="small">
                  비밀번호를 재설정할 사용자 계정에 등록된 이메일 주소를 입력하세요.
                </Text>
              </ContentGroup>
              {buttons}
              {alertBlock}
              {succeedBlock}
            </form>
          </ContentGroup>
        </Container>
      </Container>
    );
  }
}
