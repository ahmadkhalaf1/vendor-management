import React from "react";
import RadioButton from "./radio";
import './sort.scss';
import PropTypes from 'prop-types';

const Sort = ({ handleSort }) => {

  return (
    <div className="sort-widget">
      <RadioButton handleSort={handleSort} />
    </div>
  )
}

Sort.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default Sort;