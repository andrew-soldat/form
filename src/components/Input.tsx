import React, {ChangeEvent, FC, FocusEvent, useState} from 'react'

type InputProps = {
   label?: string,
   name: string,
   type: string,
   value: string,
   onBlur: (e: FocusEvent<HTMLInputElement>) => void,
   onChange: (e: ChangeEvent<HTMLInputElement>) => void,
   isValue: boolean,
   error: string
}

const Input: FC<InputProps> = (props) => {
   const {label, isValue, error, ...inputProps} = props

   return (
      <div className="input">
         <label>{label} <span>*</span></label>
         <input {...inputProps} />
         {(isValue && error) && <div className="text-error">{error}</div>}
      </div>
   );
}

export default Input;
