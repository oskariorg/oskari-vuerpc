<template>
    <button class="btn btn-primary exampleready" @click="$emit('click')">
        <slot>Run example</slot>
    </button>
</template>
/*
Just so we can style this button in one place rather than define
the bootstrap classes in every example.
*/