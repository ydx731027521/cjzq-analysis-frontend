export function setSession(userName, token, erpxerTime) {
  let user = {
    userName,
    token,
    erpxerTime
  }
  sessionStorage.setItem('user', JSON.stringify(user))
}

export function getSession() {
  let user = JSON.parse(sessionStorage.getItem('user'))
  return user ? user : null
}

export function setRefreshToken(refreshToken) {
  let user = JSON.parse(sessionStorage.getItem('user'))
  user.token = refreshToken
  sessionStorage.setItem('user', JSON.stringify(user))
}

export function clearUser() {
  sessionStorage.removeItem('user')
}
