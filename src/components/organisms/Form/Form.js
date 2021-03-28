import React from 'react';
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

export default function Form({ isOpen, setIsOpen, setLogin, handleOpen }) {
  return (
    <div>
      {isOpen === 'login' ? (
        <FormLogin setIsOpen={setIsOpen} setLogin={setLogin} />
      ) : (
        <FormRegister handleOpen={handleOpen} />
      )}
    </div>
  );
}
