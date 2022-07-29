import React, {useState, FocusEvent, ChangeEvent, useEffect, FormEvent} from 'react';

const App = () => {
   const [name, setName] = useState("")
   const [isName, setIsName] = useState(false)
   const [nameError, setNameError] = useState("Обязательно поле")
   const [email, setEmail] = useState("")
   const [isEmail, setIsEmail] = useState(false)
   const [emailError, setEmailError] = useState("Обязательно поле")
   const [phone, setPhone] = useState("")
   const [isPhone, setIsPhone] = useState(false)
   const [phoneError, setPhoneError] = useState("Обязательно поле")
   const [date, setDate] = useState("")
   const [isDate, setIsDate] = useState(false)
   const [dateError, setDateError] = useState("Обязательно поле")
   const [message, setMessage] = useState("")
   const [isMessage, setIsMessage] = useState(false)
   const [messageError, setMessageError] = useState("Обязательно поле")
   const [isValidForm, setIsValidForm] = useState(false)
   const [isSuccessForm, setIsSuccessForm] = useState(false)

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

         case "date":
            setIsDate(true)
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
         setEmailError("Не корректный email")
      } else {
         setEmailError('')
      }
   }

   const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value)
      // const regex = /^\+?(\d{7})?[- .]?\(?(?:\d\d\d)\)?[- .]?\d\d\d[- .]?\d\d[- .]?\d\d[- .]$/
      // // 7 (495) 109-98-90
      // if (!regex.test(e.target.value)) {
      //    setPhoneError("Неверный номер телефона")
      // } else {
      //    setPhoneError('')
      // }
      if (!e.target.value) {
         setPhoneError("Неверный номер телефона")
      } else {
         setPhoneError('')
      }
   }

   const dateHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value)
      if (!e.target.value) {
         setDateError("Введите дату рождения")
      } else {
         setDateError('')
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

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (isValidForm) {
         setIsValidForm(false)
         setName('')
         setEmail('')
         setPhone('')
         setDate('')
         setMessage('')
         const url = ''
         const requestOptions = {};
         fetch(url, requestOptions)
            .then(response => alert('Форма успешна отправлена'))
            .catch(error => alert('Ошибка отправки формы'))
         setTimeout(() => {
            setIsSuccessForm(true)
         },2000)

         setTimeout(() => {
            setIsSuccessForm(false)
         },10000)
      }
   }

   useEffect(() => {
      if (nameError || emailError || phoneError || dateError || messageError) {
         setIsValidForm(false)
      } else {
         setIsValidForm(true)
      }

   }, [nameError, emailError, phoneError, dateError, messageError])

   return (
      <div className="feedback-form">
         <h1 className="feedback-form__title">Форма обратной связи</h1>
         <form onSubmit={handleSubmit} id="feedback-form" action="#" className="feedback-form__body">
            <div className="feedback-form__line">
               <label className="feedback-form__label">Имя Фамилия <span>*</span></label>
               <input type="text" name="name" className="feedback-form__input"
                      value={name}
                      onBlur={(e) => errorHandler(e)}
                      onChange={(e) => nameHandler(e)} />
               {(isName && nameError) &&  <div className="feedback-form__text-error">{nameError}</div>}
            </div>
            <div className="feedback-form__line">
               <label className="feedback-form__label">Email <span>*</span></label>
               <input type="text" name="email" className="feedback-form__input"
                      value={email}
                      onBlur={(e) => errorHandler(e)}
                      onChange={(e) => emailHandler(e)} />
               {(isEmail && emailError) &&  <div className="feedback-form__text-error">{emailError}</div>}
            </div>
            <div className="feedback-form__line">
               <label className="feedback-form__label">Номер телефона <span>*</span></label>
               <input type="tel" name="phone" className="feedback-form__input"
                      placeholder="+7 (495) 109-98-90"
                      value={phone}
                      onBlur={e => errorHandler(e)}
                      onChange={(e) => phoneHandler(e)} />
               {(isPhone && phoneError) &&  <div className="feedback-form__text-error">{phoneError}</div>}
            </div>
            <div className="feedback-form__line">
               <label className="feedback-form__label">Дата рождения <span>*</span></label>
               <input type="date" name="date" className="feedback-form__input"
                      value={date}
                      onBlur={e => errorHandler(e)}
                      onChange={(e) => dateHandler(e)} />
               {(isDate && dateError) &&  <div className="feedback-form__text-error">{dateError}</div>}
            </div>
            <div className="feedback-form__line">
               <label className="feedback-form__label">Сообщение <span>*</span></label>
               <textarea name="message" className="feedback-form__textarea"
                         value={message}
                         onBlur={(e) => errorHandler(e)}
                         onChange={(e) => messageHandler(e)} >
               </textarea>
               {(isMessage && messageError) &&  <div className="feedback-form__text-error">{messageError}</div>}
            </div>
            <button disabled={!isValidForm} className="feedback-form__button" type="submit">
               Далее
            </button>
            {isSuccessForm && <div className="feedback-form__success">Форма успешно отправлена!</div>}
         </form>
      </div>
   );
}

export default App;
