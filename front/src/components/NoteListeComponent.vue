<template>
    <div class="row" v-if="notes.length > 0">

        <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
            <table class="table table-bordered table-hover">
                <tbody>
                    <tr>
                        <th>Semestre</th>
                        <th>Unité</th>
                        <th>Matière</th>
                        <th>Nom & prénom</th>
                        <th>N1</th>
                        <th>N2</th>
                        <th>N3</th>
                        <th>N4</th>
                        <th>Moyenne</th>
                        <th>Crédit</th>
                        <th>Crédit Obtenu</th>
                        <th>Moyenne Unite</th>
                        <th>V.unité</th>
                    </tr>
                </tbody>
                <tbody>
                    <tr v-for=" n in notes" :key="n.id">
                        <td>{{ n.libelle_semestre }}</td>
                        <td>{{ n.libelle_unite }}</td>
                        <td>{{ n.libelle_matiere }}</td>
                        <td>{{ n.nom }} {{ n.prenom }}</td>
                        <td>{{ n.note1 }}</td>
                        <td>{{ n.note2 }}</td>
                        <td>{{ n.note3 }}</td>
                        <td>{{ n.note4 }}</td>
                        <td>{{ n.moyenne_matiere }}</td>
                        <td>{{ n.credit_matiere }}</td>
                        <td>{{ n.credit_obtenu }}</td>
                        <td>{{ n.moyenne_unite }}</td>
                        <td>{{ n.validation_unite }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'noteListe',
    props: ['notes']
})


</script>

<style></style>