import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import { Divider, Icon } from 'react-native-elements'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { heightPercentage, spaces, widthPercentage } from '../../../theme/theme';
import { convert12hour, convertAmPm } from '../../../utils/uitils';


const ListItemForCount = ({ item, isEnd, onToggleCount }) => {

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
      <TouchableOpacity onPress={() => onToggleCount(item.userId, item.recordId, item.count)}>
        <Animated.View style={[styles.button, { opacity: opacity }]}>
          <Animated.Text style={{ color: '#fff', fontWeight: '800', transform: [{ scale }] }}>{item.isCompleted ? "cancelled" : "completed"}</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  return (
    <Swipeable renderRightActions={(_, dragX) => renderRightAction(dragX)}>
      <View style={[
          styles.container, 
          { borderColor: '#f5f5f5' }, 
          isEnd && { marginBottom: heightPercentage(spaces.l)}
        ]}
      >
        <View style={[styles.nametag, {backgroundColor: item.color}]} />
        <View style={styles.body}>
          <Icon 
            name={item.isCompleted ? 'check' : item.icon} 
            type='font-awesome-5'
            color={item.color}
            containerStyle={[styles.icon, {backgroundColor: '#F5F5F5'}]}
            key={item.title} 
          />
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.isCompleted ? 'completed': 'uncompleted'}</Text>
            </View>
            {item.isTodo && (
              <View >
                <Text style={styles.alarm}>{convertAmPm(item.hour)} {String(convert12hour(item.hour)).padStart(2, '0')}:{String(item.minute).padStart(2, '0')}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.duration}>{item.count}번</Text>
                  <Divider orientation={'vertical'} width={1} style={{ marginHorizontal: widthPercentage(spaces.s)}}/>
                  <Text style={styles.duration}>{item.goal}번</Text>
                </View>
              </View>
            )}
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
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
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
    textAlign: 'right',
  },
  duration: {
    marginTop: 6,
    textAlign: 'right',
    textAlignVertical: 'center'
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
  const {item: {isCompleted : newState}} = nextProps
  const {item: {isCompleted : oldState}} = prevProps

  return oldState === newState
}

export default React.memo(ListItemForCount, prevetnReRender);