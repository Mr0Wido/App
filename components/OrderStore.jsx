import create from 'zustand';


const useOrderStore = create((set) => ({
    orders:[],

    addOrder: (product) => set((state) =>({
        orders:[...state.orders, product],
    })),
    cleanOrders: () => set({ orders: [] }),
}));

export default useOrderStore;