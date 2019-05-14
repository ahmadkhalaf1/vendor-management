import React from "react";
import PropTypes from 'prop-types';
import Sort from "../sort/sort";
import { Row, Col } from 'antd';
const VendorHeader = props => {

  return (

    <div className="vendor-header">
      <Row type="flex" className="vendor-row">
        <Col className="logo-col" order={1} md={{ span: 4 }} sm={{ span: 6 }}>
          <div className="vendor-logo">
            <img src={props.logo} alt="vendor logo" />
          </div>
        </Col>
        <Col className="vendor-name" order={2} md={{ span: 6, push: 1 }} sm={{ span: 10 }}>
          <div >{props.name}</div>
        </Col>
        <Col className="sort-col" md={{ span: 12 , push:2}} lg={{ span: 10 , push:4}} sm={{ span: 14 }} order={3} >
          Sort by <Sort handleSort={props.handleSort} />
        </Col>
      </Row>
    </div>
  )
}

VendorHeader.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired
};

export default VendorHeader;