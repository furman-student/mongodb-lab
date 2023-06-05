import axios from "axios"

export const regexPatterns = new Map([
  ['phone', /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i],
  ['email', /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
  ['charOnly', /^[a-zA-Z ]*$/]
])

export const errorMessages = new Map([
  ['email', 'Email format is invalid'],
  ['required', 'This field is required *'],
  ['phone', 'Phone number format is invalid'],
  ['charOnly', 'Alphabetical characters only'],
  ['passwordCheck', 'Your passwords do no match'],
  ['maxLength', 'Cannot exceed than 20 characters'],
  ['minLength', 'Cannot be less than 8 characters'],
  ['age', 'You Must be older than 18 and younger then 99 years old'],
  ['image', 'File type is not acceptable, please use jpeg, png or webp'],
  ['emailExists', 'Looks like a user with this email is already registered'],
  ['usernameExists', 'Looks like a user with this username is already registered'],
])

const instance = axios.create({ baseURL: `${process.env.DOMAIN_API}api/` })

export const API = {
  getUsers: async (query) => {
    try {
      const { data } = await instance.get('users', { params: query })

      return data

    } catch ({ message, response }) {
      console.error(message)
      return response
    }
  },
  login: async (formData) => {
    try {
      const { data } = await instance.post('login', formData)

      return data

    } catch ({ message, response }) {
      console.error(message)
      return response
    }
  },
  register: async (formData) => {
    try {
      const { data } = await instance.post('auth/signup', formData)

      return data

    } catch ({ message, response }) {
      console.error(message)
      return response
    }
  },
  updateUser: async (userData) => {
    try {
      const { data } = await instance.put('users/update', userData)

      return data
    } catch ({ message, response }) {
      console.error(message)
      return response
    }
  }
}
