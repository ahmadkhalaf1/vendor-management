import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions } from "../../util/shared";
import House from '../house/house';
import './slider.scss';
import { faArrowCircleRight, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Slider = ({ houses }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  let showArrows = true;
  let numberOfCardsToDisplay = 3;

  const increaseIndex = () => setCurrentIndex(currentIndex + 1);
  const decreaseIndex = () => setCurrentIndex(currentIndex - 1);

  const renderNavigation = () => {
    // when to show right and left arrows
    let displayCondition = numberOfCardsToDisplay === 3 ?
      currentIndex + 2 <= houses.length - 3 :
      currentIndex + 1 <= houses.length - 2;

    return (
      <div className="slider-arrows">
        {!!currentIndex && (
          <a className="arrow left" href={null} onClick={decreaseIndex}>
            <FontAwesomeIcon size="3x" icon={faArrowCircleLeft} />
          </a>
        )}


        {displayCondition && (
          <a className="arrow right" href={null} onClick={increaseIndex}>
            <FontAwesomeIcon size="3x" icon={faArrowCircleRight} />
          </a>
        )}
      </div>
    )
  }


  const houseCard = (index, house) => {
    return (
      <House right={increaseIndex} left={decreaseIndex}
        showArrows={showArrows} housesLength={houses.length} sliderIndex={currentIndex}
        key={index} house={house} />
    )
  };

  const useRenderSlides = () => {
    const { width } = useWindowDimensions();

    return (
      <div className="slider-items">
        {
          houses.map((house, index) => {
            // show 2 cards for screens between 1040 and 800px of width
            if (width <= 1040 && width >= 800) {
              if (index >= currentIndex && index <= currentIndex + 1) {
                numberOfCardsToDisplay = 2;
                return houseCard(index, house);
              }
            } else if (width < 800) {
              // show only 1 card for small screens
              if (index >= currentIndex && index <= currentIndex) {
                // dont show desktop arrows at mobile view
                showArrows = false;
                return houseCard(index, house);
              }
            } else {
              // show 3 cards for the rest
              if (index >= currentIndex && index <= currentIndex + 2) {
                return houseCard(index, house);
              }
            }

          })
        }
      </div>
    )
  }

  return (
    <div className="slider">
      {useRenderSlides()}
      {!!showArrows && renderNavigation()}
    </div>
  )
}

Slider.propTypes = {
  houses: PropTypes.array.isRequired,
};


export default Slider;