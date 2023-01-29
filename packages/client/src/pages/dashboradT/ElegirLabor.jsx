/** @format */

import React from 'react';
import { Enum_Labores } from '../../utils/enums';
import { Enum_Tipo_Pago } from '../../utils/enums';
import DropDown from '../../components/Dropdown';
import useFormData from '../../components/useFormData';
import ButtonLoading from '../../components/ButtonLoading';
import Input from '../../components/Input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ElegirLabor = () => {
  const { form, formData, updateFormData } = useFormData();


  const submitForm = (e) => {
    e.preventDefault();
    if (isNaN(formData.precio)) {
      toast.error('El precio debe ser un número');
    } else {
      toast.success("Puedes agregar otro labor si lo deseas")
      // resetForm();
      //actualicemos precio a ""
      updateFormData({ ...formData, precio: '' });
    }
  };

  

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label='Labor'
          name='labor'
          required={true}
          options={Enum_Labores}
        />
        <DropDown
          label='Tipo de pago'
          name='tipo'
          required={true}
          options={Enum_Tipo_Pago}
        />
        <Input label='Precio' name='precio' required={true} />
        <ButtonLoading
          text='Confirmar'
          disabled={Object.keys(formData).length === 0}
          // loading={loadingMutationd}
        />
      </form>
    </div>
  );
};

export default ElegirLabor;
