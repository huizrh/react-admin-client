import ajax from './ajax.js'

// const BASE = 'http://localhost:5000'

const BASE = ''

//login
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')

//add user
export const reqAddUser = (userObj) => ajax(BASE + '/manage/user/add', userObj, 'POST')




