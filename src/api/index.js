import ajax from './ajax.js'

// const BASE = 'http://localhost:5000'

const BASE = ''

//login
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

//add user
export const reqAddUser = (userObj) => ajax(BASE + '/manage/user/add', userObj, 'POST')

//load category list
export const reqCategoryList = (parentId) => ajax(BASE + '/manage/category/list', { parentId }, 'GET')

//add category
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST')

//update category
export const reqUpdateCategory = (categoryId, categoryName) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST')





