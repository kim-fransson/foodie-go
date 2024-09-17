<script setup>
import DeliveryPickupToggle from './DeliveryPickupToggle.vue';
import LocalizationIcon from './icons/basic/LocalizationIcon.vue';
import LogoIcon from './icons/basic/LogoIcon.vue';
import ShoppingCartButton from './ShoppingCartButton.vue';
</script>

<template>
    <div className="flex justify-center">
        <div class="navbar max-w-screen-2xl p-4">
            <div className="navbar-start">
                <LogoIcon />
            </div>
            <div className="navbar-center flex gap-8">
                <DeliveryPickupToggle />
                <div class="flex gap-2">
                    <LocalizationIcon />
                    136 Greenpoint Ave
                </div>
            </div>
            <div className="navbar-end flex gap-6">
                <ShoppingCartButton />
                <div class="flex gap-2">
                    <button class="btn btn-ghost">Sign in</button>
                    <button class="btn btn-primary">Create account</button>
                </div>
            </div>
        </div>
    </div>
</template>
