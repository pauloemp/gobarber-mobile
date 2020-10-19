import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

import logoImg from '../../assets/images/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <S.Container>
            <Image source={logoImg} />

            <View>
              <S.Title>Faça seu logon</S.Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button
              onPress={() => {
                console.log('foi');
              }}
            >
              Entrar
            </Button>

            <S.ForgotPasswordButton
              onPress={() => {
                console.log('foi');
              }}
            >
              <S.ForgotPasswordText>Esqueci minha senha</S.ForgotPasswordText>
            </S.ForgotPasswordButton>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <S.CreateAccountButton
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountText>Criar uma conta</S.CreateAccountText>
      </S.CreateAccountButton>
    </>
  );
};

export default SignIn;
