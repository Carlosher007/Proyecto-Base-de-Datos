/** @format */

import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';


function CustomCard(props) {
  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{props.header}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{props.body}</Text>
      </CardBody>
      <CardFooter>
        <Button>{props.footer}</Button>
      </CardFooter>
    </Card>
  );
}

export default CustomCard;
