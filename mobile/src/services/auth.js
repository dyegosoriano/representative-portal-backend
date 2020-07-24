import api from './api';

export async function signIn(email, password) {
  try {
    const response = await api.post('/sessions/user', {
      email,
      password,
    });

    const { token, user } = response.data;

    return {
      token: `Bearer ${token}`,
      user,
    };
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`);
  }
}
