import {create} from "zustand"

export type isLoggedInType = {
    isLoggedIn: boolean,
    setIsLoggedIn: (value:boolean) => void
}

const useLoggedInStore = create<isLoggedInType>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (value) => set({isLoggedIn : value})
}))

export default useLoggedInStore;

