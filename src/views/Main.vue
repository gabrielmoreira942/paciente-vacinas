<template>
    <div>
        <Navbar></Navbar>
        <BaseTransition></BaseTransition>
    </div>
</template>


<script>
import Navbar from '@/components/layouts/Navbar.vue';
import BaseTransition from '@/components/layouts/transitions/BaseTransition.vue';

export default {
    components: {Navbar, BaseTransition},
    name: 'PacienteVacinasMain',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>