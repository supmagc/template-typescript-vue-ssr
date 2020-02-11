<template>
    <div>
        <b-navbar :shadow="true">
            <template #start>
                <b-navbar-item tag="router-link" to="/">Main</b-navbar-item>
                <b-navbar-item tag="router-link" to="/about">About</b-navbar-item>
            </template>
            <template #end>
                <b-navbar-dropdown label="Dropdown">
                    <b-navbar-item tag="router-link" to="/programs">Main</b-navbar-item>
                    <b-navbar-item tag="router-link" to="/projects">About</b-navbar-item>
                </b-navbar-dropdown>
            </template>
        </b-navbar>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Buefy from 'buefy';

Vue.use(Buefy);

@Component({
    metaInfo: {
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
})
export default class App extends Vue {}
</script>

<style lang="css" src="../../node_modules/buefy/dist/buefy.css"></style>
