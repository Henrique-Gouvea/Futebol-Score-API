import { IloginUser } from '../../interfaces/User/User';

export const mockLoginUser: IloginUser = {
    email: 'admin@admin.com',
    password: 'secret_admin'
}

export const mockLoginPasswordError: IloginUser = {
  email: 'admin@admin.com',
  password: 'secret'
}

export const mockLoginEmailError: IloginUser = {
  email: 'admin@admin.com',
  password: 'secret'
}

export const mockLoginNoEmail = {
  password: 'secret_admin'
}

export const mockLoginNoPassword = {
  email: 'admin@admin.com'
}


export const mockUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}