import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '@/lib/hooks/useInput';
import { emailRegex, passwordRegex } from '@/lib/utils/validate';
import { signUp } from '@/api/auth';
import { ACCESS_TOKEN } from '@/constants/token';

const SignUp = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);

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
    if (emailRegex(email)) {
      setEmailError('이메일에는 @가 포함되어야 합니다.');
      setIsEmail(false);
    } else {
      setEmailError('');
      setIsEmail(true);
    }
  }, [email]);

  useEffect(() => {
    if (passwordRegex(password)) {
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

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isClick) {
        setIsClick(true);
        signUp(email, password)
          .then(() => {
            alert('회원가입을 성공했습니다.');
            navigate('/signin');
            setIsClick(false);
          })
          .catch(() => {
            alert('이미 가입된 아이디 입니다.');
            setIsClick(false);
          });
      }
    },
    [email, password, navigate, isClick],
  );

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
        <button data-testid="signup-button" disabled={isDisabled || isClick}>
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUp;
