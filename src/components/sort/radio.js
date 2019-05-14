import React from "react";
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const RadioGroup = Radio.Group;

const RadioButton = ({ handleSort }) => {

  return (
    <RadioGroup>
      <Radio onChange={handleSort('name')} value="name">Name</Radio>
      <Radio onChange={handleSort('price')} value="price">Price</Radio>
      <Radio onChange={handleSort('living_area_total')} value="living_area_total">Size</Radio>
    </RadioGroup>
  );
}

RadioButton.propTypes = {
  handleSort: PropTypes.func.isRequired,
};

export default RadioButton;