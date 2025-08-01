export const GenerateImageUrl = (imageId) => {
    const baseUrl = import.meta.env.VITE_API_URL
    if (!id) return ''
    return `${baseUrl}/files?id=${id}`
}
import constant from "./constant";

const GetLabel = () => {
   var language = localStorage.getItem("language");
   if (!language || !constant.Languages[language]) {
      language = constant.Languages.EN;
   }
   return constant.Label[language];
};

function GenerateUUID(exist) {
   var returnData = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
   if(!exist || !Array.isArray(exist) || exist.length <= 0){
       return returnData;
   }
   while(exist.filter(data=> data == returnData).length > 1){
      returnData = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
         (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
   }
   return returnData;
}
function IsEmpty(str) {
   if(!str) return true
   return !str.trim();
}

function UpperCaseFirstChar(string) {
   // console.log(string)
   if (!string) return ""; // Mengembalikan string kosong jika inputnya kosong
   return string.charAt(0).toUpperCase() + string.slice(1);
}
function GenerateRandomUUID(length = 36) {
   const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
   const uuidArray = [];

   for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uuidArray.push(characters[randomIndex]);
   }

   return uuidArray.join("");
}
function ConvertNumberFormat(value, decimal = 2) {
  if (value === undefined || value === null || value === '') return null;

  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return null;

  const fixedValue = numericValue.toFixed(decimal);
  const [integerPart, decimalPart] = fixedValue.split('.');

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return decimal > 0 ? `${formattedInteger},${decimalPart}` : formattedInteger;
}

export default {
   GetLabel,
   UpperCaseFirstChar,
   GenerateRandomUUID,
   ConvertNumberFormat,
   IsEmpty,
   GenerateUUID
};
