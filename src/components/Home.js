import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom';
import * as Server from '../../configs/server';
import Header from './Header';
import Footer from './Footer';

const DOMAIN = Server.domain;

export default class Home extends Component {
  state = {
    groupname: ''
  };

  handleGroupnameChange = e => {
    this.setState({ groupname: e.target.value });
  }

  render() {
    const { groupname } = this.state;

    return (
      <div className="c-home u-header-container">
        <Header />
        <div className="c-home__body">
          <div className="c-home__main-row">
            <div className="c-home__main-row-body c-home__row-body">
              <div className="c-home__main-row-info">
                <div className="c-home__main-row-info-title">
                  이체 없이 WHOPAY!
                </div>
                <ul className="c-home__main-row-info-items">
                  <li className="c-home__main-row-info-item">
                    한 사람이 대표로 결제하고 WHOPAY에 등록하세요.
                  </li>
                  <li className="c-home__main-row-info-item">
                    모든 사람이 공평하게 돌아가면서 결제하세요.
                  </li>
                  <li className="c-home__main-row-info-item">
                    결제한 모든 내용을 한 사람당 단 한번의 이체로 정산하세요.
                  </li>
                </ul>
              </div>
              <div className="c-home__main-row-action">
                <div className="c-home__main-row-action-contents">
                  <div className="c-home__main-row-action-url">
                    <div className="u-subdomain-input">
                      <div className="u-subdomain-input__input-container">
                        <input
                          className="u-subdomain-input__input"
                          type="text"
                          placeholder="mygroup"
                          value={groupname}
                          autoCapitalize="none"
                          onChange={e => this.handleGroupnameChange(e)}
                        />
                      </div>
                      <div className="u-subdomain-input__domain">
                        {`.${DOMAIN}`}
                      </div>
                    </div>
                  </div>
                  <Link
                    className="c-home__main-row-action-button"
                    to={groupname ? `/create?groupname=${groupname}` : '/create'}
                  >
                    그룹 만들고 시작하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
