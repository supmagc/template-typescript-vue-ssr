import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
export default class Items extends VuexModule {
    public items = [
        {
            id: 1,
            title: 'Milk',
        },
        {
            id: 2,
            title: 'Strawberry',
        },
        {
            id: 3,
            title: 'Egg',
        },
    ];

    @Mutation
    public removeItem(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    @Mutation
    public addItem(item: { id: number; title: string }): void {
        const items = [...this.items];
        items.push(item);

        this.items = items;
    }

    /*
    actions: {
        [MAIN__ITEM_ADD_ASYNC]({ commit }, { item }) {
            setTimeout(() => {
                commit(MAIN__ITEM_ADD, { item });
            }, 1000);
        },
    },
    */
}
