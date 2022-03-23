import create from 'zustand';

const routineStore = create(set => ({
  selectColor: '#FC4F4F',
  setSelectColor: (item) => set(() => ({ selectColor: item })),
  selectIcon: 'cross',
  setSelectIcon: (item) => set(() => ({ selectIcon: item })),
}))

export default routineStore;