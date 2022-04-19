import create from 'zustand';

const createStore = create(set => ({
  selectColor: '#FC4F4F',
  setSelectColor: (item) => set(() => ({ selectColor: item })),
  selectIcon: 'cross',
  setSelectIcon: (item) => set(() => ({ selectIcon: item })),
}))

export default createStore;