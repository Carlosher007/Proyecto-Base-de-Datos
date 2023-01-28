/** @format */

import React from 'react';
import CustomCard from './CustomCard';
import { SimpleGrid } from '@chakra-ui/react';


function CardList(props) {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns='repeat(auto-fill, minmax(200px, 1fr))'
    >
      {props.data.map((item, index) => {
        return (
          <CustomCard
            key={index}
            header={item.header}
            body={item.body}
            footer={item.footer}
          />
        );
      })}
    </SimpleGrid>
  );
}

export default CardList;
