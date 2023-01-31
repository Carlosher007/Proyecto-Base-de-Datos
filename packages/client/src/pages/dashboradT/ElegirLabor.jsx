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
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const ElegirLabor = () => {
  const { form, formData, updateFormData } = useFormData();
  const { user, setUser } = useContext(AccountContext);
  const [labores, setLabores] = useState([]);

  useEffect(() => {
    loadLabores(user.id);
  }, []);
  
  const loadLabores = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/getLabores/${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setLabores(data.map((item) => item.labor));
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (isNaN(formData.precio)) {
      toast.error('El precio debe ser un número');
      return;
    } else {

      const response = await fetch("http://localhost:8000/nuevoEjerce",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, tid: user.id }),
      })
      await response.json();
      console.log(response)

      toast.success('Puedes agregar otro labor si lo deseas');
      setLabores(labores.filter((item) => item !== labores[formData.labor]));
    }
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-white-900'>Editar Objetivo</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <DropDown
          label='Labor'
          name='labor_'
          required={true}
          options={labores}
        />
        <DropDown
          label='Tipo de pago'
          name='tipo_trabajo'
          required={true}
          options={Enum_Tipo_Pago}
        />
        <Input label='Precio' name='precio' required={true} />
        <Input label='Descripcion' name='descripcion' required={false} />
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
