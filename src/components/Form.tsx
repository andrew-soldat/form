import React, {FC, useState, useEffect, FocusEvent, ChangeEvent, FormEvent} from 'react';
import Input from "./Input";
import Textarea from "./Textarea";
import emailjs from "@emailjs/browser";
import formatPhoneNumber from "../utils/formatPhoneNumber";

const SERVICE_ID = "service_fxjzu6w";
const TEMPLATE_ID = "template_ewrayq9";
const PUBLIC_KEY = "QhtEPVfIjES0CMQzV";

const Form: FC = () => {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      birthday: "",
      message: ""
   });
   const errorName = "Поле “Имя Фамилия” может состоять только из 2-х слов (имя и фамилия) латинского алфавита";
   const errorEmail = "Некорректный email";
   const errorPhone = "Некорректнй номер телефона";
   const errorBirthday = "Некорректная дата";
   const errorMessage = "Сообщение должно быть не менее 10 символов и не более 300 символов";
   const [errors, setErrors] = useState({
      name: errorName,
      email: errorEmail,
      phone: errorPhone,
      birthday: errorBirthday,
      message: errorMessage
   });
   const [isValues, setIsValues] = useState({
      name: false,
      email: false,
      phone: false,
      birthday: false,
      message: false
   });
   const [alertContent, setAlertContent] = useState({
      title: '',
      message: ''
   })
   const [isValidForm, setIsValidForm] = useState(false)
   const [isPreloader, setIsPreloader] = useState(false)
   const hasError = errors.name || errors.email || errors.phone || errors.birthday || errors.message;

   const handleBlur = (e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => setIsValues({
      ...isValues,
      [e.target.name]: true
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value})
      switch (e.target.name) {
         case "name":
            const value = e.target.value.toUpperCase()
            setFormData({...formData, [e.target.name]: value})
            const regexName = /^([A-Z]{3,30} [A-Z]{3,30})$/u;
            if (!regexName.test(value)) {
               setErrors({
                  ...errors,
                  [e.target.name]: errorName
               })
            } else {
               setErrors({...errors, [e.target.name]: ''})
            }
            break

         case "email":
            const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
            if (!regexEmail.test(e.target.value)) {
               setErrors({...errors, [e.target.name]: errorEmail})
            } else {
               setErrors({...errors, [e.target.name]: ''})
            }
            break

         case "phone":
            const formattedPhoneNumber = formatPhoneNumber(e.target.value)
            setFormData({...formData, [e.target.name]: formattedPhoneNumber})
            if (formattedPhoneNumber.length === 18) {
               setErrors({...errors, [e.target.name]: ''})
            } else {
               setErrors({...errors, [e.target.name]: errorPhone})
            }
            break

         case "birthday":
            if (!e.target.value) {
               setErrors({...errors, [e.target.name]: errorBirthday})
            } else {
               setErrors({...errors, [e.target.name]: ''})
            }
            break

         case "message":
            if (e.target.value.length < 10 || e.target.value.length > 300) {
               setErrors({
                  ...errors,
                  [e.target.name]: errorMessage
               })
            } else {
               setErrors({...errors, [e.target.name]: ''})
            }
            break
      }
   }

   const resetForm = () => {
      setFormData({
         name: "",
         email: "",
         phone: "",
         birthday: "",
         message: ""
      })
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      resetForm()
      setIsValidForm(false)
      setIsPreloader(true)
      emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
         .then(
            (result) => {
               setIsPreloader(false)
               setAlertContent({
                  title: 'Спасибо, что связались с нами.',
                  message: 'Мы ответим вам, как только сможем.'
               })
            },
            ((error) => {
               setIsPreloader(false)
               setAlertContent({
                  title: 'Что-то пошло не так.',
                  message: error.text
               })
            })
         )

      setTimeout(() => {
         setAlertContent({
            title: '',
            message: ''
         })
      }, 10000)
   }

   useEffect(() => {
      hasError ? setIsValidForm(false) : setIsValidForm(true)
   }, [hasError])

   return (
      <div className="feedback-form">
         <h1 className="feedback-form__title">Форма обратной связи</h1>
         <form onSubmit={handleSubmit} id="feedback-form" className="feedback-form__body">
            <Input label="Имя Фамилия"
                   name="name"
                   type="text"
                   value={formData.name}
                   onBlur={(e) => handleBlur(e)}
                   onChange={(e) => handleChange(e)}
                   isValue={isValues.name}
                   error={errors.name}
            />
            <Input label="Email"
                   name="email"
                   type="text"
                   value={formData.email}
                   onBlur={(e) => handleBlur(e)}
                   onChange={(e) => handleChange(e)}
                   isValue={isValues.email}
                   error={errors.email}
            />
            <Input label="Номер телефона"
                   name="phone"
                   type="tel"
                   value={formData.phone}
                   onBlur={(e) => handleBlur(e)}
                   onChange={(e) => handleChange(e)}
                   isValue={isValues.phone}
                   error={errors.phone}
            />
            <Input label="Дата рождения"
                   name="birthday"
                   type="date"
                   value={formData.birthday}
                   onBlur={(e) => handleBlur(e)}
                   onChange={(e) => handleChange(e)}
                   isValue={isValues.birthday}
                   error={errors.birthday}
            />
            <Textarea label="Сообщение"
                      name="message"
                      value={formData.message}
                      onBlur={(e) => handleBlur(e)}
                      onChange={(e) => handleChange(e)}
                      isValue={isValues.message}
                      error={errors.message}/>
            <button disabled={!isValidForm} className="feedback-form__button" type="submit">
               {isPreloader && <img src={require('../assets/img/preloader.gif')} alt="preloader" />}
               Отправить
            </button>
            {alertContent.title &&
               <div className="alert-content">
                  <div className="alert-content__title">{alertContent.title}</div>
                  <div className="alert-content__message">{alertContent.message}</div>
               </div>}
         </form>
      </div>
   );
}

export default Form;
