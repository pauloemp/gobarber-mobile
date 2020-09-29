import React from 'react';
import { Image } from 'react-native';

import * as S from './styles';

import logoImg from '../../assets/images/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <S.Container>
      <Image source={logoImg} />

      <S.Title>Faça seu logon</S.Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button
        onPress={() => {
          console.log('foi');
        }}
      >
        Entrar
      </Button>
    </S.Container>
  );
};

export default SignIn;
