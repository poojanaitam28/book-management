const baseURL = "https://book-management-i7en.vercel.app";

const ApiConfig = {
  register: `${baseURL}/api/auth/register`,
  verifyotp: `${baseURL}/api/auth/verify-otp`,
  login: `${baseURL}/api/auth/login`,
  bookcategories: `${baseURL}/api/categories`,
  booksubcategories: `${baseURL}/api/getAllSubcategories`,
  uploadImage: `${baseURL}/api/upload-image`,
  addBook: `${baseURL}/api/add-book`,
  myBooks: `${baseURL}/api/get-all-books`,
  deleteBook: `${baseURL}/api/delete-book`,
  updateBook: `${baseURL}/api/update-book`,
  forgetPassword: `${baseURL}/api/auth/forgot-password`,
  resetPassword: `${baseURL}/api/auth/reset-password`,
  addFavourite: `${baseURL}/api/add-to-favourite`,
  allFavourite: `${baseURL}/api/my-favourite-books
`,
};

export default ApiConfig;
