import React, { Component } from 'react';
import './MandalArtEditUi.scss';

const getFragmentData = (depth, num, data) => {
  if (depth === 0) {
    return {
      ...data,
    };
  }
  if (num === 0) {
    return {
      ...data.objective[depth - 1],
    };
  }
  return {
    ...data.objective[depth - 1].objective[num - 1],
  };
};

export default class MandalArtEditUi extends Component {
  render() {
    const { changeMandalData, data, selectedMandal } = this.props;
    const { startDate, endDate, done, text } = getFragmentData(
      selectedMandal.depth,
      selectedMandal.number,
      data,
    );
    console.log(done);
    return (
      <div className="edit-ui-modal">
        <div className="edit-ui-header">달성 기간을 설정해주세요</div>
        <div className="edit-ui-input">
          <input
            type="date"
            onChange={changeMandalData('startDate')}
            value={startDate}
          />{' '}
          -{' '}
          <input
            type="date"
            onChange={changeMandalData('endDate')}
            value={endDate}
          />
        </div>
        <div className="edit-ui-header">코멘트를 적어보세요</div>
        <div className="edit-ui-input">
          <input type="text" onChange={changeMandalData('text')} value={text} />
        </div>
        <form className="actions">
          목표달성여부
          <input
            id="undone"
            name="isdone"
            type="radio"
            value="undone"
            onChange={() => {
              changeMandalData('done')(false);
            }}
            checked={!done}
          />
          <label className={!done ? 'select' : ''} htmlFor="undone">
            <span>
              <span />
            </span>
            아직이요
          </label>
          <input
            id="done"
            name="isdone"
            type="radio"
            value="done"
            onChange={() => {
              changeMandalData('done')(true);
            }}
            checked={done}
          />
          <label className={done ? 'select' : ''} htmlFor="done">
            <span>
              <span />
            </span>
            달성완료!
          </label>
        </form>
      </div>
    );
  }
}
