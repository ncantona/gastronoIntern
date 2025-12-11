import { defineStore } from "pinia";
import { api } from "@/API/axios";

type ItemType = 'BEVERAGE' | 'MEAL';

interface Item {
    id: number;
    name: string;
    description: string;
    type: ItemType;
    omits: string[];
    addOns: string[];
    customMsg: string;
    isDone: boolean;
    isPickedUp: boolean;
}

interface Order {
    id: number;
    tableId: number;
    datetime: string;
    items: Item[];
};

export const useRestaurantActiveOrdersStore = defineStore('restaurantActiveOrders', {
    state: () => ({
        activeOrders: [
        // 1. Normaler Fall, ein Gericht mit Omits, eins mit AddOns
        {
            id: 1,
            tableId: 1,
            datetime: "2025-12-10T22:56:41",
            items: [
                {
                    id: 1,
                    name: "Spaghetti Carbonara",
                    description: "Klassische Pasta mit Speck und cremiger Sauce",
                    type: "MEAL",
                    omits: ["Petersilie", "Ketchup"],
                    addOns: [],
                    customMsg: "Sehr heiß bitte",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                },
                {
                    id: 2,
                    name: "Hausgemachte Limonade",
                    description: "Frisch, leicht gesüßt",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Mehr Eis", "Zitrone extra"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                }
            ]
        },

        // 2. Bestellung ohne AddOns
        {
            id: 2,
            tableId: 2,
            datetime: "2025-12-10T22:44:32",
            items: [
                {
                    id: 3,
                    name: "Margherita Pizza",
                    description: "Dünner Teig, frische Tomaten, Mozzarella",
                    type: "MEAL",
                    omits: [],
                    addOns: [],
                    customMsg: "Leicht knusprig",
                    isDone: false,
                    isPickedUp: false
                }
            ]
        },

        // 3. Bestellung ohne Omits
        {
            id: 3,
            tableId: 3,
            datetime: "2025-12-10T22:48:11",
            items: [
                {
                    id: 4,
                    name: "Tiramisu",
                    description: "Hausgemacht mit Espresso",
                    type: "MEAL",
                    omits: [],
                    addOns: ["Extra Kakao"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                }
            ]
        },

        // 4. Bestellung ohne Kommentar
        {
            id: 4,
            tableId: 4,
            datetime: "2025-12-10T22:50:21",
            items: [
                {
                    id: 5,
                    name: "Cappuccino",
                    description: "Cremig, feinporiger Milchschaum",
                    type: "BEVERAGE",
                    omits: [],
                    addOns: ["Hafermilch"],
                    customMsg: "",
                    isDone: false,
                    isPickedUp: false
                }
            ]
        },

        // 5. Bestellung mit mehr als 8 Gerichten
        {
            id: 5,
            tableId: 5,
            datetime: "2025-12-10T22:55:22",
            items: [
                { id: 6, name: "Pizza Salami", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 7, name: "Pizza Funghi", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 8, name: "Pizza Hawaii", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 9, name: "Pizza Tonno", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 10, name: "Pizza Quattro Formaggi", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 11, name: "Pizza Prosciutto", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 12, name: "Pizza Vegetarisch", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 13, name: "Pizza Pepperoni", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 14, name: "Pizza Diavola", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false }
            ]
        },

        // 6. Bestellung nur BEVERAGE
        {
            id: 6,
            tableId: 6,
            datetime: "2025-12-10T22:58:38",
            items: [
                { id: 15, name: "Espresso", description: "", type: "BEVERAGE", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 16, name: "Latte Macchiato", description: "", type: "BEVERAGE", omits: [], addOns: ["Extra Milch"], customMsg: "", isDone: false, isPickedUp: false }
            ]
        },

        // 7. Bestellung nur MEAL
        {
            id: 7,
            tableId: 7,
            datetime: "2025-12-10T23:02:57",
            items: [
                { id: 17, name: "Lasagne", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false },
                { id: 18, name: "Ravioli", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false }
            ]
        },

        // 8. Item mit sehr vielen Omits
        {
            id: 8,
            tableId: 8,
            datetime: "2025-12-10T23:05:51",
            items: [
                { id: 19, name: "Burger Spezial", description: "", type: "MEAL", omits: ["Salat", "Tomate", "Zwiebeln", "Gurke", "Speck", "Käse", "Jalapenos", "Sauce"], addOns: [], customMsg: "", isDone: false, isPickedUp: false }
            ]
        },

        // 9. Item mit sehr vielen AddOns
        {
            id: 9,
            tableId: 9,
            datetime: "2025-12-10T23:10:11",
            items: [
                { id: 20, name: "Cocktail Special", description: "", type: "BEVERAGE", omits: [], addOns: ["Extra Eis", "Limette", "Zucker", "Sirup", "Minze", "Fruchtmix", "Strohhalm", "Dekoration"], customMsg: "Mit extra Eis", isDone: false, isPickedUp: false }
            ]
        },

        // 10. Bestellung ohne MEAL
        {
            id: 10,
            tableId: 10,
            datetime: "2025-12-10T23:13:18",
            items: [
                { id: 21, name: "Orangensaft", description: "", type: "BEVERAGE", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false }
            ]
        },

        // 11. Bestellung ohne BEVERAGE
        {
            id: 11,
            tableId: 11,
            datetime: "2025-12-10T23:16:47",
            items: [
                { id: 22, name: "Gnocchi", description: "", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false }
            ]
        },

        // 12. Bestellung ohne AddOns, Omits, Kommentar
        {
            id: 12,
            tableId: 12,
            datetime: "2025-12-10T23:19:04",
            items: [
                { id: 23, name: "Salat", description: "Frisch", type: "MEAL", omits: [], addOns: [], customMsg: "", isDone: false, isPickedUp: false }
            ]
        }
        ] as Order[],
        socket: null as WebSocket | null,
    }),
    getters: {
        getOrdersByType: (state) => {
            return (type: ItemType) => {
                const orders = state.activeOrders
                    .map(order => ({
                        ...order,
                        items: order.items.filter(item => item.type === type && !item.isDone)
                    }))
                    .filter(order => order.items.length > 0);

                return orders.length === 0 ? null : orders;
            }
        },
        getOrderWithItemsByType: (state) => {
            return (orderId: number, itemType: ItemType) => {
                const order = state.activeOrders.find(order => order.id === orderId);
                if (!order)
                    return null;

                const filteredItems = order.items.filter(item => item.type === itemType && !item.isDone);
                if (filteredItems.length === 0)
                    return null;

                return {
                    ...order,
                    items: filteredItems,
                };
            }
        },
    },
    actions: {
        async loadOpenOrders() {
            const { data } = await api.get('/restaurant/activeOrders');
            this.activeOrders = data;
        },
        async setOrderAsDone(orderId :number) {
            await api.post(`/restaurant/orders/${orderId}`);
            this.activeOrders = this.activeOrders.filter(order => order.id !== orderId);
        },
        markItemAsDone(orderId :number, itemId :number) {
            const order = this.activeOrders.find(order => order.id == orderId);
            if (!order)
                return;
            const item = order.items.find(item => item.id == itemId);
            if (item)
                item.isDone = true;
        },
        connectWebSocket() {
            if (this.socket)
                return;
            this.socket = new WebSocket("wss://deinserver.com/activeOrders");
            this.socket.onmessage = (event) => {
                const order :Order = JSON.parse(event.data);
                
                if (!this.activeOrders.some(o => o.id === order.id)) {
                    this.activeOrders.push(order);
                }
            };
            this.socket.onclose = () => {
                this.socket = null;
            };
        },
    }
})