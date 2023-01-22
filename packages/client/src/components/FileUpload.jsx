/** @format */

import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useField } from 'formik';

const FileUpload = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [fileUrl, setFileUrl] = useState('');
  const [isValidImage, setIsValidImage] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    //validate file type and size here
    if (file) {
      setFileUrl(file.name);
      helpers.setValue(file);
    }
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <Input type='file' onChange={handleFileUpload} {...field} {...props} />
      {fileUrl && <FormLabel>{fileUrl}</FormLabel>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FileUpload;
