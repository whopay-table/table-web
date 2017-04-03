import React, { Component, PropTypes } from 'react'

export default class Home extends Component {
  static propTypes = {};
  static defaultProps = {};

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="c-home container">
        <h3>가상 화폐를 이체하세요</h3>
        <p>
          가상의 화폐를 이체하고, 모바일 뱅킹 앱은 더이상 켜지 마세요.
          가상 화폐가 가장 부족한 사람이 함께 쓴 비용을 결제하면 영원히 계좌이체를 하지 않아도
          번갈아가면서 적당히 돈을 쓸 수 있습니다. 
        </p>
      </div>
    )
  }
}
