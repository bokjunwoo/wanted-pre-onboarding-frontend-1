import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useInput from '@/lib/hooks/useInput';

const SignIn = () => {
  const token = localStorage.getItem('access-token');

  // 로그인 여부에 따른 리다이렉트 처리
  useEffect(() => {
    if (token) navigate('/todo');
  });

  const navigate = useNavigate();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 에러메세지
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);

  useEffect(() => {
    if (!email.includes('@')) {
      setEmailError('이메일에는 @가 포함되어야 합니다.');
      setIsEmail(false);
    } else {
      setEmailError('');
      setIsEmail(true);
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자리 이상이여야 합니다.');
      setIsPassword(false);
    } else {
      setPasswordError('');
      setIsPassword(true);
    }
  }, [password]);

  // submit 버튼
  const [isClick, setIsClick] = useState<boolean>(false);

  // 버튼 활성화
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (isEmail && isPassword) {
      setIsDisabled(false);
      return;
    } else {
      setIsDisabled(true);
    }
  }, [isEmail, isPassword]);

  const onSubmitForm = useCallback(() => {
    if (!isClick) {
      setIsClick(true);
      axios
        .post('https://pre-onboarding-selection-task.shop/auth/signin', {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem('access-token', res.data.access_token);
          alert('로그인을 성공했습니다.');
          navigate('/todo');
          setIsClick(false);
        })
        .catch(() => {
          alert('아이디와 비밀번호를 확인해주세요');
          setIsClick(false);
        });
    }
  }, [email, password, navigate, isClick]);

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="email">이메일</label>
        <input
          data-testid="email-input"
          name="email"
          type="text"
          value={email}
          onChange={onChangeEmail}
          required
        />
        {!isEmail && <div>{emailError}</div>}
        <label htmlFor="password">비밀번호</label>
        <input
          data-testid="password-input"
          name="password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        {!isPassword && <div>{passwordError}</div>}
        <button data-testid="signin-button" disabled={isDisabled || isClick}>
          로그인
        </button>
      </form>
    </>
  );
};

export default SignIn;
