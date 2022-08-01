import React, {ChangeEvent, FC, FocusEvent} from 'react'

type InputProps = {
   label: string,
   name: string,
   type: string,
   value: string,
   onBlur: (e: FocusEvent<HTMLInputElement>) => void,
   onChange: (e: ChangeEvent<HTMLInputElement>) => void,
   isValue: boolean,
   errorMessage: string
}

const Input: FC<InputProps> = ({label, name, type, value, onBlur, onChange, isValue, errorMessage}) => {
   return (
      <div className="feedback-form__line">
         <label className="feedback-form__label">{label} <span>*</span></label>
         <input className="feedback-form__input"
                name={name}
                type={type}
                value={value}
                onBlur={(e) => onBlur(e)}
                onChange={(e) => onChange(e)} />
         {(isValue && errorMessage) &&  <div className="feedback-form__text-error">{errorMessage}</div>}
      </div>
   );
}

export default Input;
