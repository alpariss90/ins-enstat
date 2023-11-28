<template>
    <ion-card>
        <ion-card-header style="background-color: #E2E8E5;">
            <ion-card-title>
                LIST SEMESTRE
            </ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <div class="offset-lg-8 offset-md-8 col-lg-4 col-md-4"><ion-searchbar placeholder="id or libelle" v-model="filter" />
            </div> <br />
            <table class="table table-hover table-bordered">
                <thead>
                <tr>
                    <th>#</th>
                    <th>LIBELLE</th>
                    <th style="text-align: right;">ACTIONS</th>
                </tr>
            </thead>
                <tbody>
                <tr v-for="s in com_getList" :key="s.id">
                    <th>{{ s.id }}</th><th>{{ s.libelle }}</th><th></th>
                </tr>
            </tbody>
            </table>
        </ion-card-content>
    </ion-card>
</template>
    
<script>
import { reactive, toRefs, defineComponent, computed, onMounted } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar } from '@ionic/vue'

export default defineComponent({
    name: 'listSemestre',
    props: ['service'],
    components: {
        IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSearchbar
    },
    setup(props) {

        const state = reactive({
            semestres: [],
            id: 0,
            filter: ''
        })



        const getAll = async () => {
            try {
                const response = await props.service.getAllSemestre();
                state.semestres=response.data.semestres;
            } catch (error) {
                console.log("Erreur get list semestre " + error);
            }
        }

        const com_getList = computed(() => {
            if (state.filter == '')
                return state.semestres
            else{
                return state.semestres.filter(e => {
                    return e.libelle.includes(state.filter) || e.id==state.filter
                })
            }
                
        })

        onMounted(() => {
            getAll()
        })






        return { ...toRefs(state), getAll, com_getList }
    }
})



</script>
    
<style></style>