var app = new Vue({
    el: '#app',
    data: {
        items: [],
        name: '',
        ingredients: '',
        instructions: '',
        contributor: '',
        category: '',
        show: 'all',
        addRecipeActive: false,
    },
    created: function() {
        this.getItems();
    },
    computed: {
        activeItems() {
            return this.items.filter(item => {
                return !item.completed;
            });
        },
        filteredItems() {
            if (this.show === 'breakfast')
                return this.items.filter(item => {
                    console.log("filtered breakfast items: " + item.category);
                    console.log("items: " + this.items[0].category);
                    return item.category === 'breakfast';
                });
            if (this.show === 'lunch')
                return this.items.filter(item => {
                    return item.category === 'lunch';
                });
            if (this.show === 'dinner')
                return this.items.filter(item => {
                    return item.category === 'dinner';
                });
            if (this.show === 'snack')
                return this.items.filter(item => {
                    return item.category === 'snack';
                });
            if (this.show === 'other')
                return this.items.filter(item => {
                    return item.category === 'other';
                });
            return this.items;
        },
    },
    methods: {
        async addItem() {
            try {
                const response = await axios.post("/api/items", {
                    name: this.name,
                    category: this.category,
                    ingredients: this.ingredients,
                    instructions: this.instructions,
                    contributor: this.contributor,
                });
                this.name = "";
                this.category = "";
                this.ingredients = "";
                this.instructions = "";
                this.contributor = "";
                this.getItems();
            }
            catch (error) {
                console.log(error);
            }
        },
        async completeItem(item) {
            try {
                const response = axios.put("/api/items/" + item.id, {
                    name: item.name,
                    completed: !item.completed,
                });
                this.getItems();
            }
            catch (error) {
                console.log(error);
            }
        },
        async deleteItem(item) {
            try {
                const response = await axios.delete("/api/items/" + item.id);
                this.getItems();
            }
            catch (error) {
                console.log(error);
            }
        },
        showAll() {
            this.show = 'all';
        },
        showBreakfast() {
            this.show = 'breakfast';
        },
        showLunch() {
            this.show = 'lunch';
        },
        showDinner() {
            this.show = 'dinner';
        },
        showSnack() {
            this.show = 'snack';
        },
        showOther() {
            this.show = 'other';
        },
        async getItems() {
            try {
                const response = await axios.get("/api/items");
                this.items = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        activateAddRecipe() {
            this.addRecipeActive = true;
        },
        deactivateAddRecipe() {
            this.addRecipeActive = false;
        }
    }
});