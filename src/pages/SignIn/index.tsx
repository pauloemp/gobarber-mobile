import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import * as S from './styles';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/images/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      if (formRef.current) {
        try {
          formRef.current.setErrors({});

          const schema = Yup.object().shape({
            email: Yup.string().required('Digite seu e-mail'),
            password: Yup.string().required('Digite sua senha'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          await signIn({ email: data.email, password: data.password });
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current.setErrors(errors);
          } else {
            Alert.alert(
              'Erro na autenticação',
              'Ocorreu um erro ao fazer logon, cheque suas credenciais',
            );
          }
        }
      }
    },
    [signIn],
  );

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

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ width: '100%' }}
            >
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                name="password"
                icon="lock"
                ref={passwordInputRef}
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

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
