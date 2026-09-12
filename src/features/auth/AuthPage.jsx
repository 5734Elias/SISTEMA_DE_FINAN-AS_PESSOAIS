import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common';
import { Input } from '../../components/forms';
import { ROUTES } from '../../routes/routePaths';
import './AuthPage.scss';

export const AuthPage = ({ mode = 'login' }) => {
  const navigate = useNavigate();
  const { login, register, sendPasswordReset, getRememberedCredentials } = useAuth();

  const [currentMode, setCurrentMode] = useState(mode); // 'login' | 'register' | 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Preenchimento automático de credenciais lembradas
  useEffect(() => {
    if (currentMode === 'login') {
      const creds = getRememberedCredentials();
      if (creds && creds.remember) {
        setEmail(creds.email);
        setPassword(creds.password);
        setRememberMe(true);
      }
    }
  }, [currentMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (currentMode === 'login') {
        if (!email.trim() || !password) {
          setError('Preencha todos os campos obrigatórios.');
          return;
        }
        login(email, password, rememberMe);
        navigate(ROUTES.DASHBOARD);
      } else if (currentMode === 'register') {
        if (!name.trim() || !email.trim() || !password) {
          setError('Todos os campos são obrigatórios.');
          return;
        }
        if (password.length < 6) {
          setError('A senha deve possuir no mínimo 6 caracteres.');
          return;
        }
        if (password !== confirmPassword) {
          setError('As senhas digitadas não coincidem.');
          return;
        }
        register(name.trim(), email.trim(), password);
        navigate(ROUTES.DASHBOARD);
      } else if (currentMode === 'forgot') {
        if (!email.trim()) {
          setError('Digite seu e-mail cadastrado.');
          return;
        }
        const res = sendPasswordReset(email.trim());
        setSuccessMessage(res.message);
      }
    } catch (err) {
      setError(err.message || 'Ocorreu um erro. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="auth-card__logo">💰</div>
          <h1 className="auth-card__title">
            {currentMode === 'login' && 'Acessar sua Conta'}
            {currentMode === 'register' && 'Criar Nova Conta'}
            {currentMode === 'forgot' && 'Recuperação de Senha'}
          </h1>
          <p className="auth-card__subtitle">
            {currentMode === 'login' && 'Digite seus dados para gerenciar seu patrimônio.'}
            {currentMode === 'register' && 'Cadastre-se e tenha controle financeiro total.'}
            {currentMode === 'forgot' && 'Enviaremos um link de redefinição para o seu e-mail.'}
          </p>
        </div>

        {error && <div className="auth-alert auth-alert--error">{error}</div>}
        {successMessage && <div className="auth-alert auth-alert--success">{successMessage}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {currentMode === 'register' && (
            <Input
              label="Nome Completo"
              placeholder="Ex: Elias Ribeiro"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <Input
            label="E-mail"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {currentMode !== 'forgot' && (
            <div className="auth-form__password-field">
              <div className="input-group">
                <label className="input-group__label">Senha</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input-group__field"
                    placeholder="Sua senha secreta"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword((prev) => !prev)}
                    title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentMode === 'register' && (
            <div className="input-group">
              <label className="input-group__label">Confirmar Senha</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-group__field"
                placeholder="Repita sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          {currentMode === 'login' && (
            <div className="auth-form__options">
              <label className="remember-me-checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Lembrar credenciais no login</span>
              </label>

              <button
                type="button"
                className="forgot-link"
                onClick={() => {
                  setError('');
                  setSuccessMessage('');
                  setCurrentMode('forgot');
                }}
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth size="lg">
            {currentMode === 'login' && 'Entrar no Sistema'}
            {currentMode === 'register' && 'Concluir Cadastro'}
            {currentMode === 'forgot' && 'Enviar Link de Redefinição'}
          </Button>

          <div className="auth-card__footer">
            {currentMode === 'login' && (
              <p>
                Ainda não possui uma conta?{' '}
                <button
                  type="button"
                  className="switch-mode-btn"
                  onClick={() => {
                    setError('');
                    setSuccessMessage('');
                    setCurrentMode('register');
                  }}
                >
                  Cadastre-se gratuitamente
                </button>
              </p>
            )}

            {currentMode === 'register' && (
              <p>
                Já possui uma conta ativa?{' '}
                <button
                  type="button"
                  className="switch-mode-btn"
                  onClick={() => {
                    setError('');
                    setSuccessMessage('');
                    setCurrentMode('login');
                  }}
                >
                  Fazer login
                </button>
              </p>
            )}

            {currentMode === 'forgot' && (
              <p>
                Lembrou da senha?{' '}
                <button
                  type="button"
                  className="switch-mode-btn"
                  onClick={() => {
                    setError('');
                    setSuccessMessage('');
                    setCurrentMode('login');
                  }}
                >
                  Voltar ao Login
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

