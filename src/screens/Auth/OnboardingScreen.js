import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// components
import AuthContainer from '../../components/blocks/Containers/AuthContainer';
import { fontPercentage, heightPercentage, widthPercentage } from '../../theme/theme';
import AuthButton from '../../components/atoms/Button/AuthButton';


const OnboardingScreen = ({ navigation }) => {

  return (
    <AuthContainer>
      <View style={[ styles.titleGroup, { flex: 0.8 } ]}>
        <Text style={styles.welcome}>예수님의 노크</Text>
        <Text style={styles.title}>Knock Knock</Text>
        <Text style={styles.subtitle}>{`습관을 따라\n주님과 동행하는 시간`}</Text>
      </View>
      <View style={[ styles.authSection, { flex: 0.2 } ]}>
        <AuthButton label="로그인" onPress={() => navigation.navigate("signin")} />
        <TouchableOpacity 
          style={styles.linkTextWrapper}
          onPress={() => navigation.navigate("signup")}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  titleGroup: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: fontPercentage(24),
  },
  title: {
    textTransform: 'uppercase',
    fontSize: fontPercentage(36),
    fontWeight: '700',
    marginBottom: heightPercentage(24),
  },
  subtitle: {
    fontSize: fontPercentage(16),
    lineHeight: fontPercentage(24),
    textAlign: 'center',
  },
  authSection: {
    width: '100%',
    justifyContent: 'center',
  },
  linkTextWrapper: {
    marginTop: heightPercentage(24),
    marginBottom: heightPercentage(12),
  },
  linkText: {
    textAlign: 'center',
    fontSize: fontPercentage(18),
    fontWeight: '500',
  },
});

export default OnboardingScreen;