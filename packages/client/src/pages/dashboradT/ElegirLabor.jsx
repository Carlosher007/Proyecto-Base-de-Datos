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
    fetch(`http://localhost:8000/getLabores/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        // console.log(res);
        if (!res || !res.ok || res.status >= 400) {
          toast.warning('No hay labores disponibles, lo mejor es que vayas a dashboard')
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setLabores(data.map((item) => item.labor));
      });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const price = parseFloat(formData.precio);
    //pero como formData.labot es un string necesitamos parsearlo a int,. asi:
    const indice = parseInt(formData.labor_);
    const laborAsociado = labores[indice];
    if (isNaN(formData.precio)) {
      toast.error('El precio debe ser un número');
      return;
    } else {
      console.log(formData);

      // const response = await fetch('http://localhost:8000/nuevoEjerce', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     tid: user.id,
      //     labor_: laborAsociado,
      //     precio: price,
      //   }),
      // });
      // await response.json();
      // console.log(response);

      fetch('http://localhost:8000/nuevoEjerce', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tid: user.id,
          labor_: laborAsociado,
          precio: price,
        }),
      })
        .catch((err) => {
          return;
        })
        .then((res) => {
          // console.log(res);
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          toast.warning(
            'Es posible que ya este asociado a ese labor, intente eligiendo otro'
          );
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          toast.success('Puedes agregar otro labor si lo deseas');
          setLabores(
            labores.filter((item) => item !== labores[formData.labor])
          );
        });
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
