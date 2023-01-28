/** @format */

import React from 'react';
import CardList from '../../components/CardList';

const data = [
  {
    header: 'Customer dashboard',
    body: 'View a summary of all your customers over the last month.',
    footer: 'View here',
  },
  {
    header: 'Customer dashboard',
    body: 'View a summary of all your customers over the last month.',
    footer: 'View here',
  },
  {
    header: 'Customer dashboard',
    body: 'View a summary of all your customers over the last month.',
    footer: 'View here',
  },
];

const DashboardT = () => {
  return <CardList data={data} />;
};

export default DashboardT;
