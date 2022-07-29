import React, {FC, FocusEvent, useState} from 'react'

// type InputProps = {
//    name: string;
// }

// const Textarea: FC = (props) => {
//    const [isFocus, setIsFocus] = useState(false)
//    const { label, errorMessage, onChange, ...inputProps } = props;
//
//    const handlerError = (e: FocusEvent<HTMLInputElement>) => {
//       setIsFocus(true)
//    }
//
//    return (
//       <div className="feedback-form__line">
//          <label className="feedback-form__label" htmlFor="name">{label}<span>*</span></label>
//          <input
//             {...inputProps}
//             className="feedback-form__textarea"
//             onBlur={handlerError}
//             onChange={onChange}
//          />
//          {isFocus &&  <div className="feedback-form__text-error">{errorMessage}</div>}
//       </div>
//    );
// }

// export default Textarea;
