import {ChangeEvent, FC, FocusEvent, useState} from 'react'
// import {InputType} from "../App";

// type InputProps = {
//    input: InputType,
//    value: string,
//    label: string,
//    onChange: string,
//    errorMessage: string
// }
//
// const Input: FC = (props: any) => {
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
//             className="feedback-form__input"
//             onBlur={handlerError}
//             onChange={onChange}
//          />
//          {isFocus &&  <div className="feedback-form__text-error">{errorMessage}</div>}
//       </div>
//    );
// }

// export default Input;
