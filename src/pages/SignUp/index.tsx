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
              <S.Title>Crie sua conta</S.Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
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
        </ScrollView>
      </KeyboardAvoidingView>

      <S.BackToSignInButton
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <S.BackToSignInText>Voltar para logon</S.BackToSignInText>
      </S.BackToSignInButton>
    </>
  );
};

export default SignIn;
