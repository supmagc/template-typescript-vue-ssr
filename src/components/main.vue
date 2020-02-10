<template>
    <div>
        <h1>Shopping list</h1>
        <div v-for="item in items" :key="item.id" :class="$style.item">
            <span>{{ item.title }}</span>
            <span>
                <button :data-id="item.id" @click="removeItem">Remove</button>
            </span>
        </div>

        <div :class="$style.controls">
            <input @value="title" @input="onChangeTitle" />
            <button @click="addItem">Add item</button>
            <button @click="">Add item after one second</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const itemsModule = namespace('Items');

@Component({
    metaInfo: {
        title: 'Main page',
    },
})
export default class Main extends Vue {
    @itemsModule.State
    private items!: [{ id: number; title: string }];

    @itemsModule.Mutation('addItem')
    private storeAddItem!: (item: { id: number; title: string }) => void;

    @itemsModule.Mutation('removeItem')
    private storeRemoveItem!: (id: number) => void;
    /*
    computed: {
        ...mapState({
            items: state => state.main.items,
        }),
    },
    */

    private mounted(): void {
        console.log('Mounted');
    }

    private serverPrefetch(): void {
        console.log('Run only on server');
    }

    /*
    private addAsyncItem(): void {
        const item = {
            id: Math.floor(Math.random() * 100),
            title: this.$data.title,
        };

        this.$store.dispatch(MAIN__ITEM_ADD_ASYNC, { item });
    }
*/

    private addItem(): any {
        const item = {
            id: Math.floor(Math.random() * 100),
            title: '' + this.$data.title,
        };

        return this.storeAddItem(item);
    }

    private removeItem(e: any): any {
        const id = +e.target.getAttribute('data-id');
        this.storeRemoveItem(id);
    }
}
</script>

<style module>
.item {
    padding: 3px 0;
}

.controls {
    margin-top: 12px;
}
</style>
