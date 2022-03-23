import create from 'zustand';

const userStore = create(set => ({
  currentUser: { isLoggedIn: null },
  setCurrentUser: (updatedUser) => set(() => ({ currentUser: updatedUser })),
}))

export default userStore;