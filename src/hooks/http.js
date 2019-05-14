import { useEffect } from "react";
import { useStateValue } from './state';
import { SET_LOADING, SET_VENDORS , SET_ERROR } from './type';
export const useHttp = url => {
  const [vendors, dispatch] = useStateValue();

  useEffect(() => {

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error while fetching.');
        }
        return response.json();
      })
      .then(data => {
        console.log("http is running");

        /*
        Map over the houses and group by Vendor
        */
        var dateMap = data.results
          .reduce((accumulator, house) => {
            var vendorId = house.vendor_verbose.id;
            var entry = accumulator[vendorId];
            if (typeof entry === 'undefined') {
              accumulator[vendorId] = [house];
            }
            else {
              entry.push(house);
            }
            return accumulator;
          }, {});

        var vendorsList = Object.keys(dateMap).map((house) => {
          return {
            id: dateMap[house][0].vendor_verbose.id,
            name: dateMap[house][0].vendor_verbose.display_name,
            logo: dateMap[house][0].vendor_verbose.logo.original,
            houses: dateMap[house]
          };
        });

        dispatch({
          type: SET_VENDORS,
          vendors: vendorsList
        });

        dispatch({
          type: SET_LOADING,
          loading: false
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: SET_LOADING,
          loading: false
        });

        dispatch({
          type: SET_ERROR,
          error: true
        });
      });

  }, []);

  return vendors;
}