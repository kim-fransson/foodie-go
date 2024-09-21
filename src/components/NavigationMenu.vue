<script setup>
import { RouterLink } from 'vue-router';
import DeliveryPickupToggle from './DeliveryPickupToggle.vue';
import LocalizationIcon from './icons/basic/LocalizationIcon.vue';
import LogoIcon from './icons/basic/LogoIcon.vue';
import ShoppingCartButton from './ShoppingCartButton.vue';
import NavigationIcon from './icons/basic/NavigationIcon.vue';
import ShoppingCartDrawerTrigger from './ShoppingCartDrawerTrigger.vue';
</script>

<template>
    <div className="flex flex-col justify-center p-4">
        <div class="navbar max-w-screen-2xl">
            <div className="navbar-start">
                <RouterLink to="/">
                    <LogoIcon />
                </RouterLink>
            </div>
            <div className="navbar-center hidden lg:flex gap-8">
                <DeliveryPickupToggle id="desktop" />
                <div class="flex gap-2">
                    <LocalizationIcon />
                    136 Greenpoint Ave
                </div>
            </div>
            <div className="navbar-end flex lg:gap-6">
                <ShoppingCartButton class="hidden lg:block" />
                <ShoppingCartDrawerTrigger class="lg:hidden" />
                <div class="lg:flex hidden gap-2">
                    <button class="btn btn-ghost">Sign in</button>
                    <button class="btn btn-primary">Create account</button>
                </div>
                <button class="lg:hidden btn btn-ghost">
                    <NavigationIcon />
                </button>
            </div>
        </div>
        <div class="lg:hidden">
            <DeliveryPickupToggle id="mobile" />
        </div>
    </div>
</template>
