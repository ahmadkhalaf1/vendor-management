import React, { useState, useEffect } from "react";
import { useStateValue } from '../../hooks/state';

import { formatPrice } from '../../util/shared';
import PropTypes from 'prop-types';

import './house.scss';
import 'antd/dist/antd.css';

import { Card, Icon, Input } from "antd";
import { SET_EDITED_HOUSES } from "../../hooks/type";
const { Meta } = Card;

const House = props => {
  let house = props.house;
  let img = house.exterior_images[0]['fill-320x240'];

  const [editMode, setEditMode] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [price, setPrice] = useState(house.price);
  const [{ editedHouses }, dispatch] = useStateValue();
  const [priceClass, setPriceClass] = useState('price-input');


  const editPrice = () => {
    setEditMode(true);
    setCurrentPrice(price);
  }

  const savePrice = () => {

    setEditMode(false);

    // dont append to editable houses list if price did not change
    if (currentPrice !== price) {
      let houseId = house.internal_id;
      let houseExist = editedHouses.update.find(o => o.id === houseId);
      if (houseExist) {
        /*
        update exist edited house price 
        */

        // can use a map function instead to avoid mutating the refernce
        houseExist.price = price;

        dispatch({
          type: SET_EDITED_HOUSES,
          editedHouses: editedHouses
        });

      } else {
        /*
        add edited house to edited houses list 
        */
        dispatch({
          type: SET_EDITED_HOUSES,
          editedHouses: {
            update: [
              ...editedHouses.update,
              {
                id: houseId, price: price
              }
            ]
          }
        });
      }
    }

  }

  const cardStyle = {
    width: '300px',
    height: '400px',
    WebkitBoxShadow: '2px 8px 15px 3px rgba(0, 0, 0, 0.12)',
    MozBoxShadow: '2px 8px 15px 3px rgba(0, 0, 0, 0.12)',
    BoxShadow: '2px 8px 15px 3px rgba(0, 0, 0, 0.12)'
  };



  const setIcons = () => {
    let saveIcon = (<Icon type="save" onClick={() => savePrice()} />);
    let editIcon = (<Icon type="edit" onClick={() => editPrice()} />);

    let showRightIcon = props.showArrows ? null : props.sliderIndex < props.housesLength - 1;
    let showLeftIcon = !!props.sliderIndex;

    let rightIcon = showRightIcon && (<Icon type="arrow-right" onClick={() => props.right()} />);
    let leftIcon = showLeftIcon && (<Icon type="arrow-left" onClick={() => props.left()} />);

    if (!editMode) {
      if (!props.showArrows) {
        return [leftIcon, editIcon, rightIcon];
      } else {
        return [editIcon];
      }
    }

    if (!props.showArrows) {
      return [leftIcon, saveIcon, rightIcon];
    } else {
      return [saveIcon];
    }

  };

  const handleNewPice = (e) => {
    e.preventDefault();
    let newPrice = e.target.value;
    const regex = /^[0-9\b]+$/;
    if (regex.test(newPrice) && newPrice > 0) {
      setPriceClass('price-input');
      setPrice(newPrice);
    } else {
      setPriceClass('price-input shake');
    }
  }

  const additionalContent = () => {

    let priceInput = (<Input className={priceClass} type="number" size="small"
      onChange={(e) => handleNewPice(e)}
      value={price} placeholder="price" />);

    return (
      <div className="additional" >

        <p>House ID : {house.internal_id}</p>
        {editMode && priceInput}
        {!editMode &&
          <p>Price: {formatPrice(price)} €</p>}
        <p>Size: {house.living_area_total} sqm</p>
      </div>
    )
  };
  return (
    <div className="house">
      <Card
        style={cardStyle}
        cover={<img alt="house" src={img} />}
        actions={setIcons()}
      >
        <Meta title={house.name}
          description={additionalContent()} />
      </Card>
    </div>
  )
}

House.propTypes = {
  house: PropTypes.object.isRequired,
  right: PropTypes.func.isRequired,
  left: PropTypes.func.isRequired,
  housesLength: PropTypes.number.isRequired,
  showArrows: PropTypes.bool.isRequired,
  sliderIndex: PropTypes.number.isRequired,
};

export default House;