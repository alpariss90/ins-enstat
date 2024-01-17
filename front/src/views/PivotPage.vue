<template>
    <layout-template pageTitre="PIVOT" />
    <!-- <vue-pivottable-ui
    :data="[{color: 'blue', shape: 'circle'},{color: 'red', shape: 'triangle'}]"
    :rows="['color']"
    :cols="['shape']"
  >
  </vue-pivottable-ui>

    <vue-pivottable-ui :data="pivoData" :rows="['color']" :cols="['shape']" />-->
</template>

<script>
//import { VuePivottableUi } from 'vue-pivottable'
//import 'vue-pivottable/dist/vue-pivottable.css'
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
    components: {
        //VuePivottableUi
    },
    setup() {
        const state = reactive({
            pivoData: [
                
            ]
        })


        onMounted(() => {
            state.pivoData=[{ color: 'blue', shape: 'circle' },
        { color: 'blue', shape: 'circle' }]
        })

        return {...toRefs(state)}
    }
})
</script>

<style></style>