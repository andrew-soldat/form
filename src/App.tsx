import React, {useState, FocusEvent, ChangeEvent, useEffect, FormEvent} from 'react';
import Input from "./components/Input";
import Textarea from "./components/Textarea";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_fxjzu6w";
const TEMPLATE_ID = "template_ewrayq9";
const USER_ID = "QhtEPVfIjES0CMQzV";

const App = () => {
   const [name, setName] = useState("")
   const [isName, setIsName] = useState(false)
   const [nameError, setNameError] = useState("Обязательное поле")
   const [email, setEmail] = useState("")
   const [isEmail, setIsEmail] = useState(false)
   const [emailError, setEmailError] = useState("Обязательное поле")
   const [phone, setPhone] = useState("")
   const [isPhone, setIsPhone] = useState(false)
   const [phoneError, setPhoneError] = useState("Обязательное поле")
   const [birthday, setBirthday] = useState("")
   const [isBirthday, setIsBirthday] = useState(false)
   const [birthdayError, setBirthdayError] = useState("Обязательное поле")
   const [message, setMessage] = useState("")
   const [isMessage, setIsMessage] = useState(false)
   const [messageError, setMessageError] = useState("Обязательное поле")
   const [isValidForm, setIsValidForm] = useState(false)
   const [isSuccessForm, setIsSuccessForm] = useState(false)
   const hasError = nameError || emailError || phoneError || birthdayError || messageError

   const errorHandler = (e: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>) => {
      switch (e.target.name) {
         case "name":
            setIsName(true)
            break

         case "email":
            setIsEmail(true)
            break

         case "phone":
            setIsPhone(true)
            break

         case "birthday":
            setIsBirthday(true)
            break

         case "message":
            setIsMessage(true)
            break
      }
   }

   const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value.toUpperCase()
      setName(name)
      const regex = /^([A-Z]{3,30} [A-Z]{3,30})$/u;
      if (!regex.test(name)) {
         setNameError('Поле “Имя Фамилия” может состоять только из 2-х слов (имя и фамилия) латинского алфавита')
      } else {
         setNameError('')
      }
   }

   const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value)
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/
      if (!regex.test(e.target.value)) {
         setEmailError("Некорректный email")
      } else {
         setEmailError('')
      }
   }

   const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value)
      if (!e.target.value) {
         setPhoneError("Неверный номер телефона")
      } else {
         setPhoneError('')
      }
   }

   const birthdayHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setBirthday(e.target.value)
      if (!e.target.value) {
         setBirthdayError("Введите дату рождения")
      } else {
         setBirthdayError('')
      }
   }

   const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value)
      if (!e.target.value) {
         setMessageError("Введите сообщение")
      } else if (e.target.value.length < 10) {
         setMessageError("Сообщение должно быть не менее 10 символов")
      } else if (e.target.value.length > 300) {
         setMessageError("Сообщение должно содержать не более 300 символов")
      } else {
         setMessageError('')
      }
   }

   const resetForm = () => {
      setName('')
      setEmail('')
      setPhone('')
      setBirthday('')
      setMessage('')
   }

   const handleSubmit = (e: any) => {
      e.preventDefault()

      if (isValidForm) {
         resetForm()
         setIsValidForm(false)

         emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
            .then(
               (result) => {
                  console.log(result.text);
                  console.log('Форма успешно отправлена!')
                  setIsSuccessForm(true)
               },
               ((error) => {
                  console.log(error.text);
                  console.log('Ошибка отправки формы')
               })
            )

         setTimeout(() => {
            setIsSuccessForm(false)
         },5000)
      }
   }

   useEffect(() => {
      if (!!hasError) {
         setIsValidForm(false)
      } else {
         setIsValidForm(true)
      }

   }, [hasError])

   return (
      <div className="feedback-form">
         <h1 className="feedback-form__title">Форма обратной связи</h1>
         <form onSubmit={handleSubmit} id="feedback-form" action="#" className="feedback-form__body">
            <Input label="Имя Фамилия"
                   name="name"
                   type="text"
                   value={name}
                   onBlur={(e) => errorHandler(e)}
                   onChange={(e) => nameHandler(e)}
                   isValue={isName}
                   errorMessage={nameError}
            />
            <Input label="Email"
                   name="email"
                   type="text"
                   value={email}
                   onBlur={errorHandler}
                   onChange={emailHandler}
                   isValue={isEmail}
                   errorMessage={emailError}
            />
            <Input label="Номер телефона"
                   name="phone"
                   type="tel"
                   value={phone}
                   onBlur={errorHandler}
                   onChange={phoneHandler}
                   isValue={isPhone}
                   errorMessage={phoneError}
            />
            <Input label="Дата рождения"
                   name="birthday"
                   type="date"
                   value={birthday}
                   onBlur={errorHandler}
                   onChange={birthdayHandler}
                   isValue={isBirthday}
                   errorMessage={birthdayError}
            />
            <Textarea label="Сообщение"
                      name="message"
                      value={message}
                      onBlur={errorHandler}
                      onChange={messageHandler}
                      isValue={isMessage}
                      errorMessage={messageError} />
            <button disabled={!isValidForm} className="feedback-form__button" type="submit">
               {isSuccessForm ? 'Отправка...' : 'Отправить'}
            </button>
            {isSuccessForm && <div className="feedback-form__success">Форма успешно отправлена!</div>}
         </form>
      </div>
   );
}

export default App;
