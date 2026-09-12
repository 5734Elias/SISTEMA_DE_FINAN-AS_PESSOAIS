import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USERS_STORAGE_KEY = '@finances:registered_users';
const SESSION_STORAGE_KEY = '@finances:current_user';
const REMEMBERED_CREDS_KEY = '@finances:remembered_credentials';

const DEFAULT_USER = {
  id: 'u1',
  name: 'Elias Ribeiro dos Reis',
  email: 'elias.re_is@hotmail.com',
  password: '123456@Password',
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [DEFAULT_USER];
    } catch {
      return [DEFAULT_USER];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(SESSION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_USER; // Inicia logado com usuário padrão
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch {}
  }, [currentUser]);

  const login = (email, password, remember = false) => {
    const userFound = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!userFound) {
      throw new Error('E-mail ou senha incorretos.');
    }

    setCurrentUser(userFound);

    if (remember) {
      localStorage.setItem(
        REMEMBERED_CREDS_KEY,
        JSON.stringify({ email: userFound.email, password: userFound.password, remember: true })
      );
    } else {
      localStorage.removeItem(REMEMBERED_CREDS_KEY);
    }

    return userFound;
  };

  const register = (name, email, password) => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('Este e-mail já está cadastrado.');
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const sendPasswordReset = (email) => {
    const userFound = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!userFound) {
      throw new Error('Não encontramos uma conta vinculada a este endereço de e-mail.');
    }
    // Simulação do disparo do e-mail com token seguro
    return {
      success: true,
      message: `Um link seguro de redefinição de senha foi enviado para ${email}. Verifique sua caixa de entrada e spam.`,
    };
  };

  const getRememberedCredentials = () => {
    try {
      const saved = localStorage.getItem(REMEMBERED_CREDS_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        register,
        logout,
        sendPasswordReset,
        getRememberedCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
};

