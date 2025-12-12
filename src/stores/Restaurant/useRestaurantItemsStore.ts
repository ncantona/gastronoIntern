import { defineStore } from "pinia";
import { api } from "@/API/axios";

type ItemType = 'BEVERAGE' | 'MEAL';

interface Modifier {
    id: number,
    name: string,
    price: number,
}

interface Item {
    id: number;
    name: string;
    description: string;
    categoryName: string;
    categoryPosition: number;
    position: number;
    code: string;
    possibleOmits: Modifier[],
    possibleAddons: Modifier[],
    type: ItemType;
    price: number;
    rating: number;
    prepTime: string;
    isAvailable: boolean;
};


export const useItemsStore = defineStore('itemsStore', {
    state: () => ({
        items: [  // ---------------------- Getränke ----------------------
            { id: 1, name: "Coca-Cola", description: "Klassische Cola, 330ml", categoryName: "Getränke", categoryPosition: 1, position: 1, code: "BEV01", possibleOmits: [], possibleAddons: [], type: "BEVERAGE", price: 2.5, rating: 4.5, prepTime: "00:00", isAvailable: true },
            { id: 2, name: "Apfelsaft", description: "Frisch gepresster Apfelsaft, 250ml", categoryName: "Getränke", categoryPosition: 1, position: 2, code: "BEV02", possibleOmits: [], possibleAddons: [], type: "BEVERAGE", price: 3.0, rating: 4.7, prepTime: "00:00", isAvailable: true },
            { id: 3, name: "Latte Macchiato", description: "Heiße Milch mit Espresso", categoryName: "Getränke", categoryPosition: 1, position: 3, code: "BEV03", possibleOmits: [{id: 1,name:"Milch",price:0},{id:2,name:"Zucker",price:0}], possibleAddons:[{id:3,name:"Vanille Sirup",price:0.5},{id:4,name:"Karamell Sirup",price:0.5}], type:"BEVERAGE", price: 3.5, rating: 4.8, prepTime: "00:05", isAvailable:true },
            { id: 4, name: "Espresso", description: "Starker Espresso", categoryName: "Getränke", categoryPosition: 1, position: 4, code: "BEV04", possibleOmits: [], possibleAddons: [{id:5,name:"Extra Shot",price:0.5}], type:"BEVERAGE", price: 2.0, rating: 4.6, prepTime: "00:03", isAvailable:true },
            { id: 5, name: "Mineralwasser", description: "Sprudel oder still, 500ml", categoryName: "Getränke", categoryPosition: 1, position: 5, code: "BEV05", possibleOmits: [], possibleAddons: [], type:"BEVERAGE", price: 2.0, rating: 4.4, prepTime: "00:00", isAvailable:true },
            { id: 6, name: "Rotwein Glas", description: "Hausrotwein, 150ml", categoryName: "Getränke", categoryPosition: 1, position: 6, code: "BEV06", possibleOmits: [], possibleAddons: [], type:"BEVERAGE", price: 4.5, rating: 4.7, prepTime: "00:00", isAvailable:true },
            { id: 7, name: "Weißwein Glas", description: "Hausweißwein, 150ml", categoryName: "Getränke", categoryPosition: 1, position: 7, code: "BEV07", possibleOmits: [], possibleAddons: [], type:"BEVERAGE", price: 4.5, rating: 4.6, prepTime: "00:00", isAvailable:true },
            { id: 8, name: "Bier", description: "Pils vom Fass, 0,3l", categoryName: "Getränke", categoryPosition: 1, position: 8, code: "BEV08", possibleOmits: [], possibleAddons: [], type:"BEVERAGE", price: 3.0, rating: 4.5, prepTime: "00:00", isAvailable:true },
            { id: 9, name: "Cocktail Mojito", description: "Rum, Minze, Limette, Zucker", categoryName: "Getränke", categoryPosition: 1, position: 9, code: "BEV09", possibleOmits: [], possibleAddons: [], type:"BEVERAGE", price: 7.0, rating: 4.9, prepTime: "00:05", isAvailable:true },

            // ---------------------- Vorspeisen ----------------------
            { id: 10, name: "Caesar Salad", description: "Frischer Salat mit Caesar-Dressing, Croutons und Parmesan", categoryName: "Vorspeisen", categoryPosition: 2, position: 1, code: "APP01", possibleOmits:[{id:10,name:"Croutons",price:0},{id:11,name:"Parmesan",price:0}], possibleAddons:[{id:12,name:"Hähnchenbrust",price:2}], type:"MEAL", price:6.5, rating:4.6, prepTime:"00:10", isAvailable:true },
            { id: 11, name: "Tomatensuppe", description: "Hausgemachte Suppe mit frischen Tomaten", categoryName:"Vorspeisen", categoryPosition:2, position:2, code:"APP02", possibleOmits:[], possibleAddons:[{id:13,name:"Basilikum Creme",price:0.5}], type:"MEAL", price:5.0, rating:4.5, prepTime:"00:08", isAvailable:true },
            { id: 12, name: "Bruschetta", description: "Geröstetes Brot mit Tomaten, Knoblauch, Basilikum", categoryName:"Vorspeisen", categoryPosition:2, position:3, code:"APP03", possibleOmits:[], possibleAddons:[{id:14,name:"Extra Käse",price:0.5}], type:"MEAL", price:4.5, rating:4.7, prepTime:"00:07", isAvailable:true },
            { id: 13, name: "Mozzarella Sticks", description:"Frittierter Mozzarella mit Dip", categoryName:"Vorspeisen", categoryPosition:2, position:4, code:"APP04", possibleOmits:[], possibleAddons:[{id:15,name:"Marinara Sauce",price:0.5}], type:"MEAL", price:5.5, rating:4.6, prepTime:"00:10", isAvailable:true },

            // ---------------------- Hauptgerichte ----------------------
            { id: 20, name:"Cheeseburger", description:"Rindfleisch-Burger mit Käse, Salat, Tomate", categoryName:"Hauptgerichte", categoryPosition:3, position:1, code:"MAIN01", possibleOmits:[{id:20,name:"Tomate",price:0},{id:21,name:"Salat",price:0},{id:22,name:"Käse",price:0}], possibleAddons:[{id:23,name:"Extra Käse",price:1},{id:24,name:"Speck",price:1.5}], type:"MEAL", price:9.0, rating:4.7, prepTime:"00:15", isAvailable:true },
            { id: 21, name:"Spaghetti Bolognese", description:"Hausgemachte Bolognese-Sauce auf Spaghetti", categoryName:"Hauptgerichte", categoryPosition:3, position:2, code:"MAIN02", possibleOmits:[{id:25,name:"Parmesan",price:0}], possibleAddons:[{id:26,name:"Extra Sauce",price:1}], type:"MEAL", price:10.0, rating:4.8, prepTime:"00:20", isAvailable:true },
            { id: 22, name:"Margherita Pizza", description:"Pizza mit Tomatensauce und Mozzarella", categoryName:"Hauptgerichte", categoryPosition:3, position:3, code:"MAIN03", possibleOmits:[{id:27,name:"Mozzarella",price:0}], possibleAddons:[{id:28,name:"Extra Oliven",price:0.5},{id:29,name:"Extra Basilikum",price:0.3}], type:"MEAL", price:8.5, rating:4.6, prepTime:"00:15", isAvailable:true },
            { id: 23, name:"Vegetarisches Curry", description:"Gemüsecurry mit Kokosmilch und Reis", categoryName:"Hauptgerichte", categoryPosition:3, position:4, code:"MAIN04", possibleOmits:[], possibleAddons:[{id:30,name:"Extra Tofu",price:1}], type:"MEAL", price:11.0, rating:4.7, prepTime:"00:18", isAvailable:true },
            { id: 24, name:"Gegrilltes Lachsfilet", description:"Lachs mit Gemüse und Kartoffeln", categoryName:"Hauptgerichte", categoryPosition:3, position:5, code:"MAIN05", possibleOmits:[], possibleAddons:[{id:31,name:"Zitrone",price:0}], type:"MEAL", price:14.0, rating:4.9, prepTime:"00:20", isAvailable:true },

            // ---------------------- Beilagen ----------------------
            { id: 30, name:"Pommes Frites", description:"Knusprige Pommes", categoryName:"Beilagen", categoryPosition:4, position:1, code:"SID01", possibleOmits:[], possibleAddons:[{id:32,name:"Ketchup",price:0},{id:33,name:"Mayonnaise",price:0}], type:"MEAL", price:3.0, rating:4.5, prepTime:"00:07", isAvailable:true },
            { id: 31, name:"Reis", description:"Gedämpfter Reis", categoryName:"Beilagen", categoryPosition:4, position:2, code:"SID02", possibleOmits:[], possibleAddons:[], type:"MEAL", price:2.5, rating:4.4, prepTime:"00:05", isAvailable:true },
            { id: 32, name:"Gemüse Mix", description:"Gedünstetes Gemüse", categoryName:"Beilagen", categoryPosition:4, position:3, code:"SID03", possibleOmits:[], possibleAddons:[{id:34,name:"Extra Butter",price:0.5}], type:"MEAL", price:3.5, rating:4.6, prepTime:"00:08", isAvailable:true },

            // ---------------------- Desserts ----------------------
            { id: 40, name:"Schokoladenkuchen", description:"Warmer Schokoladenkuchen mit Vanilleeis", categoryName:"Desserts", categoryPosition:5, position:1, code:"DES01", possibleOmits:[{id:35,name:"Vanilleeis",price:0}], possibleAddons:[{id:36,name:"Schlagsahne",price:0.5},{id:37,name:"Beerenmix",price:1}], type:"MEAL", price:5.5, rating:4.9, prepTime:"00:08", isAvailable:true },
            { id: 41, name:"Apfelstrudel", description:"Mit Vanillesoße", categoryName:"Desserts", categoryPosition:5, position:2, code:"DES02", possibleOmits:[], possibleAddons:[{id:38,name:"Eis",price:1}], type:"MEAL", price:5.0, rating:4.7, prepTime:"00:10", isAvailable:true },
            { id: 42, name:"Eisbecher", description:"Vanille- und Schokoladeneis mit Toppings", categoryName:"Desserts", categoryPosition:5, position:3, code:"DES03", possibleOmits:[], possibleAddons:[{id:39,name:"Sahne",price:0.5},{id:40,name:"Kekse",price:0.5}], type:"MEAL", price:5.5, rating:4.8, prepTime:"00:05", isAvailable:true },
        ] as Item[],
    }),

    getters: {
        getItemsByCategory: (state) => {
            return (categoryName :string) => 
                state.items
                    .filter(item => item.categoryName == categoryName)
                    .sort((a, b) => a.position - b.position);
        },
        getActiveItemsByCategory: (state) => {
            return (categoryName :string) =>
                state.items
                    .filter(item => item.categoryName == categoryName)
                    .sort((a, b) => a.position - b.position)
                    .filter(item => item.isAvailable);
        },
    },
    actions: {
        async loadItems() {
            const { data } = await api.get('/restaurant/items');
            this.items = data;
        },
        async updateItem(id :number, fields: Partial<Item>) {
            const { data } = await api.put(`/restaurant/items/${id}`, fields);
            const index = this.items.findIndex(item => item.id == id);
            if (index !== -1) {
                this.items[index] = data;
            }
        },
        async deleteItemById(id :number) {
            await api.delete(`/restaurant/items/${id}`);
            this.items = this.items.filter(item => item.id !== id);
        },
        async setItemAvailability(id :number, isAvailable: boolean) {
            const { data } = await api.put(`/restaurant/items/${id}/availability`, { isAvailable });
            const index = this.items.findIndex(item => item.id == id);
            if (index !== -1) {
                this.items[index] = data;
            }
        }
    },
})