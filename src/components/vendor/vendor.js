import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { useSort, applySort } from '../../util/shared';

import VendorHeader from "./vendorHeader";
import Slider from "../slider/slider";
import './vendor.scss';

const Vendor = props => {
  const [vendor, setVendor] = useState(props.vendor);
  const { sortBy, handleSort } = useSort();

  useEffect(() => {
    setVendor({
      ...vendor,
      houses: applySort(vendor.houses, sortBy)
    });
  }, [sortBy]);

  return (
    <div className="vendor">
      <VendorHeader name={vendor.name} handleSort={handleSort} logo={vendor.logo} />
      <hr />
      <div className="houses-container">
        <Slider houses={vendor.houses} />
      </div>
      <hr />
    </div>
  )
}

Vendor.propTypes = {
  vendor: PropTypes.object.isRequired,
};


export default Vendor;