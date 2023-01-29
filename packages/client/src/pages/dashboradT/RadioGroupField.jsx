/** @format */

import React, { useState } from 'react';
import { Radio, RadioGroup } from '@chakra-ui/react';

const CustomRadioGroup = ({ name, label, options, ...props }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <label>{label}</label>
      <RadioGroup
        isInline
        onChange={handleChange}
        value={selectedValue}
        {...props}
      >
        {options.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CustomRadioGroup;
