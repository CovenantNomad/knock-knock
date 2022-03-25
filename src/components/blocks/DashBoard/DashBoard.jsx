import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';


const DashBoard = ({ percentage, totalCount, completedCount, today }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row]}>
        <View style={styles.column}>
          <View>
            <Text style={styles.title}>{today.getMonth()+1}월 {today.getDate()}일</Text>
            <Text style={styles.subtitle}></Text>
          </View>
        </View>
        <View style={[styles.column, {borderLeftWidth: 1, borderLeftColor: '#F5F5F5'}]}>
          <View>
            <Text style={styles.title}>{percentage || `0`}%</Text>
            <Text style={styles.subtitle}>영적루틴 달성</Text>
          </View>
          <Icon
            name='chart-bar'
            type='font-awesome-5'
            color='#7870AF'
            containerStyle={[styles.icon, {backgroundColor: '#E5E2EF'}]}
          />
        </View>
      </View>
      <View style={[styles.row, {borderTopWidth: 1, borderTopColor: '#F5F5F5'}]}>
        <View style={styles.column}>
          <View>
            <Text style={styles.title}>{totalCount - completedCount}</Text>
            <Text style={styles.subtitle}>남은 영적루틴</Text>
          </View>
          <Icon
            name='fire'
            type='font-awesome-5'
            color='#F55B4F'
            containerStyle={[styles.icon, {backgroundColor: '#FDDEDC'}]}
          />
        </View>
        <View style={[styles.column, {borderLeftWidth: 1, borderLeftColor: '#F5F5F5'}]}>
          <View>
            <Text style={styles.title}>{totalCount}</Text>
            <Text style={styles.subtitle}>오늘의 영적루틴</Text>
          </View>
          <Icon
            name='flag-checkered'
            type='font-awesome-5'
            color='#983658'
            containerStyle={[styles.icon, {backgroundColor: '#EAD6DD'}]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    height: 160,
    borderRadius: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  column: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    opacity: 0.6,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default DashBoard;