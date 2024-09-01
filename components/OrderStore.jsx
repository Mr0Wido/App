import {create} from 'zustand';


const useOrderStore = create((set) => ({
    orders:[],

    addOrder: (product) => set((state) => {
        const existingProduct = state.orders.findIndex(order => order.id === product.id);
            // findIndex  -1 den büyükse ürün var yoksa -1 döndürür
        if(existingProduct > -1){
            // ürünü amaount güncellemesi
            const updateOrders = [...state.orders];
            updateOrders[existingProduct].amaount += product.amaount;
            return { orders: updateOrders};
        } else{
            // yeni ürün ekleme
            return { orders: [...state.orders, product]};
        }
    }),
  
    cleanOrders: () => set({ orders: [] }),
}));

export default useOrderStore;