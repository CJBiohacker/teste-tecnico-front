<script>
import resourceService from '@/services/resource.service';
import router from '@/router';


export default {
    async setup() {


        const isAddUserWindowOpen = () => {
        }

        const goToUserCardsListView = () => {
            router.push({ name: 'listUsers' });
        }

        const goToResourcesListView = () => {

        }

        return {
            responsiveValue,
            isAddUserWindowOpen,
            goToUserCardsListView,
            goToResourcesListView
        }


        // console.log("🚀 ~ colorsData ~ colorsData:", colorsData)
        // console.log("🚀 ~ setup ~ resourceNamesList:", seriesData)

        // color: "#98B2D1"
        // id: 1
        // name: "cerulean"
        // pantone_value: "15-4020"
        // year: 2000

        //    const series = [
        //         {
        //           data: seriesData
        //         }
        //       ]

        //     const chartOptions = {
        //         legend: {
        //           show: true
        //         },
        //         chart: {
        //           height: 350,
        //           type: 'treemap'
        //         },
        //         title: {
        //           text: 'Mapeamento de Recurso por cor'
        //         },
        //         colors: colorsData,
        //         plotOptions: {
        //           treemap: {
        //             distributed: true,
        //             enableShades: false
        //           }
        //         }
        //       }

        //       <div>
        //             <apexchart class="ma-8" :width="responsiveValue.width" heigth="600" type="treemap" :options="chartOptions" :series="series"></apexchart>
        //         </div>
        // const { displayValues } = useDisplayStore();

        // const listedResources = await resourceService.listResources()
        // console.log("🚀 ~ setup ~ listedResources:", listedResources)

        // const seriesData = listedResources.data.map((resource) => {
        //     return {
        //         x: resource.name,
        //         y: resource.pantone_value,
        //     }
        // })

        // const colorsData = listedResources.data.map((resource) => {
        //     return resource.color
        // })
        // const responsiveValue = computed(() => {
        //     const { width, height } = displayValues;

        //     if (width <= 1920) {
        //         return {
        //             width: 680,
        //             height
        //         }
        //     }

        //     if (width <= 810) {
        //         return {
        //             width,
        //             height
        //         }
        //     }
        // })
    },
};

</script>

<template>
    <v-container id="dashboard-container" fluid>
        <v-card color="light" elevation="8" variant="flat"
            class="mx-auto d-flex flex-column align-center justify-space-evenly dashboard-card">
            <div>
                <v-card-title class="text-h4 text-center">DashBoard</v-card-title>
                <p class="text-h5 text-center">
                    Olá Usuário,<br> selecione a opção desejada.
                </p>
            </div>
            <div class="d-flex flex-column ga-10">
                <v-btn rounded="lg" variant="flat" color="green" @click="isAddUserWindowOpen()">Adicionar um
                    usuário</v-btn>
                <v-btn rounded="lg" variant="flat" color="purple" @click="goToUserCardsListView()">Listar todos
                    usuários</v-btn>
                <v-btn rounded="lg" variant="flat" color="deep-orange" @click="goToResourcesListView()">Mapear
                    recursos</v-btn>
            </div>

        </v-card>
    </v-container>
</template>

<style lang="scss" scoped>
#dashboard-container {
    height: 100%;

    .dashboard-card {
        height: 100%;
    }
}
</style>