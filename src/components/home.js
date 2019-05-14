import React, { useEffect } from "react";

import Vendor from "./vendor/vendor";
import { css } from '@emotion/core';
import { useHttp } from "../hooks/http";
import { SET_EDITED_HOUSES } from "../hooks/type";
import { useStateValue } from '../hooks/state';

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { useSort, applySort } from '../util/shared';
import Sort from "./sort/sort";
import { SET_VENDORS } from '../hooks/type';
import { Layout, Menu, Button } from 'antd';

const { Header, Content } = Layout;

const Home = () => {
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  min-height: 100vh;
`;

  // fetch vendors and houses
  useHttp('http://localhost:1337/houses');
  const [{ vendors, loading, editedHouses, error }, dispatch] = useStateValue();
  const { sortBy, handleSort } = useSort();

  useEffect(() => {
    dispatch({
      type: SET_VENDORS,
      vendors: vendors.map(vendor => ({
        ...vendor,
        houses: applySort(vendor.houses, sortBy)
      }))
    })
  }, [sortBy]);


  const printUpdate = () => {
    if (editedHouses.update.length > 0) {
      console.log(editedHouses);

      dispatch({
        type: SET_EDITED_HOUSES,
        editedHouses: { update: [] }
      });
    }
  }

  return (
    <div className="sweet-loading">
      <ClimbingBoxLoader
        css={override}
        sizeUnit={"px"}
        size={50}
        color={'#bc1212'}
        loading={loading} />
      {error && <Layout className="error-msg">
        <Content>
          <h5>This page is taking a nap at one of our houses :) please try again later or contact our support team</h5>
        </Content>
      </Layout>}

      {!loading && !error && <Layout className="layout home">

        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px', textAlign: 'center' }}>
            <Menu.Item >Sort all by
              <div className="global-sort">
                <Sort handleSort={handleSort} />
              </div>
            </Menu.Item>
            {editedHouses.update.length > 0 &&
              <Menu.Item style={{ marginRight: '20px' }} >
                <Button type="primary" onClick={() => printUpdate()}>Save</Button>
              </Menu.Item>}
          </Menu>
        </Header>
        <h5 className="app-title">FH.de Vendor Management</h5>
        <Content style={{ padding: '0 20px' }}>

          <div style={{ background: '#fff', padding: 24, minHeight: '100vh' }}>

            {vendors && vendors.map((vendor, index) => { return (<Vendor key={index} vendor={vendor} />) })}
          </div>
        </Content>
      </Layout>}
    </div>

  )

}

export default Home;