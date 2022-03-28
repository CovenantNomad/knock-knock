import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { GestureDetector } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { heightPercentage, spaces } from '../../../theme/theme';
import { convert12hour, convertAmPm } from '../../../utils/uitils';


const ListItem = ({ item, isEnd, onToggleCompleted, onDeleted }) => {

  const renderRightAction = (dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp"
    })

    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp"
    })

    return (
      <TouchableOpacity onPress={() => onToggleCompleted(item.userId, item.recordId, item.completed)}>
        <Animated.View style={[styles.button, { opacity: opacity }]}>
          <Animated.Text style={{ color: '#fff', fontWeight: '800', transform: [{ scale }] }}>{item.completed ? "cancelled" : "completed"}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  const renderLeftActions = (dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp"
    })

    const opacity = dragX.interpolate({
      inputRange: [0, 20, 100],
      outputRange: [0, 0.9, 1],
      extrapolate: "clamp"
    })

    return (
      <TouchableOpacity onPress={() => onDeleted(item.userId, item.recordId)}>
        <Animated.View style={[styles.button, { opacity: opacity }]}>
          <Animated.Text style={{ color: '#fff', fontWeight: '800', transform: [{ scale }] }}>Delete</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  console.log(`${item.title} 렌더링`)

  return (
    <Swipeable renderRightActions={(_, dragX) => renderRightAction(dragX)} renderLeftActions={(_, dragX) => renderLeftActions(dragX)}>
      <View style={[
          styles.container, 
          { borderColor: '#f5f5f5' }, 
          isEnd && { marginBottom: heightPercentage(spaces.l)}
        ]}
      >
        <View style={[styles.nametag, {backgroundColor: item.color}]} />
        <View style={styles.body}>
          <Icon 
            name={item.completed ? 'check' : item.icon} 
            type='font-awesome-5'
            color={item.color}
            containerStyle={[styles.icon, {backgroundColor: '#F5F5F5'}]}
            key={item.title} 
          />
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.completed ? 'completed': 'uncompleted'}</Text>
            </View>
            <View>
              <Text style={styles.alarm}>{convertAmPm(item.hour)} {String(convert12hour(item.hour)).padStart(2, '0')}:{String(item.minute).padStart(2, '0')}</Text>
              <Text style={styles.duration}>{item.duration}분</Text>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12
  },
  nametag: {
    width: '5%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  body: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
  },
  icon: {
    margin: 16,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  alarm: {
    fontSize: 14,
  },
  duration: {
    marginTop: 6,
    textAlign: 'right',
  },
  button: {
    flex: 1,
    backgroundColor: '#FF8A80',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    marginBottom: 12
  }
});

const prevetnReRender = (prevProps, nextProps) => {
  const {item: {completed : newState}} = nextProps
  const {item: {completed : oldState}} = prevProps

  return oldState === newState
}

export default React.memo(ListItem, prevetnReRender);