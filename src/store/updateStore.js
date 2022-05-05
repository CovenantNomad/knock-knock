import create from 'zustand';

const updateStore = create(set => ({
  updateColor: '',
  setUpdateColor: (item) => set(() => ({ updateColor: item })),
  updateIcon: '',
  setUpdateIcon: (item) => set(() => ({ updateIcon: item })),
}))

export default updateStore;