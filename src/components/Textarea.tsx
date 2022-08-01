import React, {ChangeEvent, FC, FocusEvent} from 'react'

type TextareaProps = {
   label: string,
   name: string,
   value: string,
   onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void,
   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
   isValue: boolean,
   errorMessage: string
}

const Textarea: FC<TextareaProps> = ({label, name, value, onBlur, onChange, isValue, errorMessage}) => {
   return (
      <div className="feedback-form__line">
         <label className="feedback-form__label">{label} <span>*</span></label>
         <textarea className="feedback-form__textarea"
                   name={name}
                   value={value}
                   onBlur={(e) => onBlur(e)}
                   onChange={(e) => onChange(e)}
         >
         </textarea>
         {(isValue && errorMessage) &&  <div className="feedback-form__text-error">{errorMessage}</div>}
      </div>
   );
}

export default Textarea;
