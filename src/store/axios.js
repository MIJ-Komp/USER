import axios from "axios";
import constant from "../constant/constant";
// import helper from "../constant/helper";
// import showToast from "../components/toast";

var processing = []
const cache = new Map();
// Membuat instance Axios
// // console.log('API Base URL:', import.meta);
// // console.log('API Base URL:', process.env);

const apiClient = axios.create({
   baseURL: import.meta.env.VITE_API_URL, // Ganti dengan URL API Anda
   timeout: 60000, // Waktu tunggu (optional)
});


// Menambahkan interceptor untuk menambahkan header
apiClient.interceptors.request.use(
   async (config) => {
      config.method = config.method ? config.method.toUpperCase() : "GET";
      config.metadata = { startTime: new Date() };

      const token = localStorage.getItem("authorization");
      const queryParams = new URLSearchParams();
      // queryParams.append('isFromAdmin', true);

      config.params = {
         ...config.params,
         ...Object.fromEntries(queryParams.entries()),
      };

      if (token) {
         config.headers["Authorization"] = token; // Menambahkan token Bearer
      }

      const requestData = {
         url: config.url,
         headers: JSON.stringify(config.headers),
         data: JSON.stringify(config.data),
         params: JSON.stringify(config.params),
         method: config.method,
      };

      return config
      let existingRequest = processing.find((data) =>
         data.url === requestData.url &&
         data.data === requestData.data &&
         data.headers === requestData.headers &&
         data.params === requestData.params &&
         data.method === requestData.method
      );
      if(!existingRequest){
         let resolvePromise;

         const cancelTokenSource = axios.CancelToken.source(); 
         const requestPromise = new Promise((resolve, reject) => {
            resolvePromise = resolve;
            cancelTokenSource.token.promise = reject;
         });

         // Tambahkan request baru ke dalam daftar processing
         processing.push({
            config,
            ...requestData,
            promise: requestPromise,
            resolve: resolvePromise,
            cancelTokenSource
         });
         config.cancelToken = cancelTokenSource.token;

         return config;
      }
      else{
         console.log("Menunggu request sebelumnya selesai:", existingRequest);
         try{
         const data = await existingRequest.promise
         console.log(data)
            return Promise.resolve(data)
         }
         catch(err){
            return Promise.reject(err)
         }
      }
   },
   (error) => {
      return Promise.reject(error);
   }
);

//set sesuai response backend
apiClient.interceptors.response.use(
   (response) => {
      // Proses respons jika berhasil
      if (response && response.data && response.data.code != 200) {
         if (response.data.message) {
            return Promise.reject(response.data.message);
         }
         else
            return Promise.reject(response.data.content);
      }
      else if (response.data && (response.data.content || response.data.code == 200)) {
         return response.data.content || response.data.message;
      }
      else
         return response.data; // Mengembalikan data langsung
   },
   (error) => {
      console.log(error)
      
      // var return null

      if (error.code === "ECONNABORTED") {
         return Promise.reject("Request timed out. Please try again later.");
      }
      
      // Tangani error di sini
      if (error.response && error.response.data.code === 401) {
            window.location.href = "/login";
            localStorage.removeItem("authorization");
            localStorage.removeItem("user");
      }
      
      return Promise.reject(error.response.data);
   }
);

function getKey(request){
   return `${request.url}-${request.data}-${request.method}-${request.params}-${request.headers}`;
}

// Ekspor instance Axios
export default apiClient;
