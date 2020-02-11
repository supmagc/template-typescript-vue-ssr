<template>
    <div class="container">
        <h1>Shopping list</h1>
        <div v-for="item in items" :key="item.id" :class="$style.item">
            <span>{{ item.title }}</span>
            <span>
                <button :data-id="item.id" @click="removeItemHandler">Remove</button>
            </span>
        </div>

        <div :class="$style.controls">
            <b-field label="Title">
                <b-input v-model="title"></b-input>
            </b-field>
            <b-button @click="addItemHandler">Add Item</b-button>
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
    private title = 'StartValue';

    @itemsModule.State
    private items!: [{ id: number; title: string }];

    @itemsModule.Mutation('addItem')
    private storeAddItem!: (item: { id: number; title: string }) => void;

    @itemsModule.Mutation('removeItem')
    private storeRemoveItem!: (id: number) => void;

    private mounted(): void {
        console.log('Mounted');
    }

    private serverPrefetch(): void {
        console.log('Run only on server');
    }

    private addItemHandler(): void {
        const item = {
            id: Math.floor(Math.random() * 100),
            title: '' + this.title,
        };

        this.storeAddItem(item);
    }

    private removeItemHandler(e: any): void {
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
