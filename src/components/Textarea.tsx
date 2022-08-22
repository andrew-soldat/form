import React, {ChangeEvent, FC, FocusEvent} from 'react'

type TextareaProps = {
   label?: string,
   name: string,
   value: string,
   onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void,
   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
   isValue: boolean,
   error: string
}

const Textarea: FC<TextareaProps> = (props) => {
   const {label, isValue, error, ...textareaProps} = props

   return (
      <div className="textarea">
         <label className="feedback-form__label">{label} <span>*</span></label>
         <textarea className="feedback-form__textarea"
                   {...textareaProps}
         >
         </textarea>
         {(isValue && error) && <div className="text-error">{error}</div>}
      </div>
   );
}

export default Textarea;
