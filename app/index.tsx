import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../components/CommonButton';
import SelectLangModal from "../components/SelectLangModal";
import {useTranslation} from 'react-i18next';
import i18n from '../i18n'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

// Validation schema for login
const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const [selectLanguage, setSelectLanguage] = useState('English');
  const navigation = useNavigation<any>();
  const [showModal, setShowModal] = useState(false);
  const {t} = useTranslation();
  const currentLocale = i18n.language; 
  const router = useRouter();
  useEffect(() => {
    checkLng();
  }, []);
  const checkLng = async () => {
    const x = await AsyncStorage.getItem('LANG');
    if (x != null) {
      i18n.changeLanguage(x);
      let lng =
        x == 'en'
          ? 'English'
          : x == 'hi'
          ? 'हिंदी'
          : x == 'pa'
          ? 'ਪੰਜਾਬੀ'
          : 'தமிழ்';
      setSelectLanguage(lng);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.langView}
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={styles.lang}>{selectLanguage}</Text>
        <Image source={require('../assets/images/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.wish}>{t('welcome')}</Text>
      <Text style={styles.title}>{t('signInHeadline')}</Text>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={loginValidationSchema}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              placeholder={t('email')}
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              placeholder={t('password')}
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Text style={styles.forgotPass}>{t('forgotPassword')}</Text>
            <CommonButton  title={t('login')} onPress={handleSubmit} />

            <Text
             onPress={() => router.push('/signup')}
              style={styles.linkText}>
              {t('createNewUser')}
            </Text>
          </View>
        )}
       
      </Formik>
      <SelectLangModal
        visible={showModal}
        selectedLang={selectLanguage}
        onClose={() => {
          setShowModal(false);
        }}
        onSelect={async lang => {
          let lng =
            lang == 'English'
              ? 'en'
              : lang == 'हिंदी'
              ? 'hi'
              : lang == 'ਪੰਜਾਬੀ'
              ? 'pa'
              : 'ta';
          await AsyncStorage.setItem('LANG', lng);
          i18n.changeLanguage(lng);
          setSelectLanguage(lang);
          setShowModal(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 10,
    tintColor: '#9e9e9e',
  },
  wish: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  linkText: {
    color: 'black',
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  forgotPass: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginBottom: 20,
  },
  langView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#9e9e9e',
    position: 'absolute',
    top: 30,
    right: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  lang: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Login;