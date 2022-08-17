const formatPhoneNumber = (value: string) => {
   if (!value) return value
   let phoneNumber = value.replace(/[^\d]/g, '')
   let firstNumber =phoneNumber.slice(0,1)
   let phoneNumberLength = phoneNumber.length
   if (firstNumber === "7") {
      phoneNumber = phoneNumber.slice(1)
      if (phoneNumberLength < 2) {
         return firstNumber
      } else if (phoneNumberLength < 5) {
         return `+${firstNumber} ${phoneNumber.slice(0,3)}`
      } else if (phoneNumberLength < 8) {
         return `+${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`
      } else if (phoneNumberLength < 10) {
         return `+${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,8)}`
      }
      return `+${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,8)}-${phoneNumber.slice(8,10)}`
   } else if (firstNumber === "8") {
      phoneNumber = phoneNumber.slice(1)
      if (phoneNumberLength < 2) {
         return firstNumber
      } else if (phoneNumberLength < 5) {
         return `${firstNumber} ${phoneNumber.slice(0,3)}`
      } else if (phoneNumberLength < 8) {
         return `${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`
      } else if (phoneNumberLength < 10) {
         return `${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,8)}`
      }
      return `${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,8)}-${phoneNumber.slice(8,10)}`
   } else {
      firstNumber = '7'
      if (phoneNumberLength < 5) {
         return `+${firstNumber} ${phoneNumber.slice(0,3)}`
      } else if (phoneNumberLength < 8) {
         return `+${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3)}`
      } else if (phoneNumberLength < 10) {
         return `+${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,8)}`
      }
      return `+${firstNumber} (${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3,6)}-${phoneNumber.slice(6,8)}-${phoneNumber.slice(8,10)}`
   }
}

export default formatPhoneNumber
