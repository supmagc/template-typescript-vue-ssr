<template>
    <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="container">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <router-link to="/" class="navbar-item">Main</router-link>
                        <router-link to="/about" class="navbar-item">About</router-link>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <a class="navbar-link">
                                Dropdown
                            </a>

                            <div class="navbar-dropdown">
                                <router-link to="/programs" class="navbar-item">Main</router-link>
                                <router-link to="/projects" class="navbar-item">About</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Buefy from 'buefy';

Vue.use(Buefy);

export default class App extends Vue {}
</script>

<style lang="css" src="../../node_modules/buefy/dist/buefy.css"></style>
