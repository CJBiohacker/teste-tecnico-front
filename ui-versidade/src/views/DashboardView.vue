<script>
import { reactive, ref } from 'vue';
import { useSnackBarStore } from '@/stores/snackbar';
import router from '@/router';
import userService from '@/services/user.service';


export default {
    async setup() {
        const name = ref('');
        const job = ref('');

        const isWindowOpen = reactive({ value: false });
        const isLoading = reactive({ value: false })
        const nameRules = reactive([v => !!v || 'Digite um nome', v => v.length > 3 || 'O nome precisa ter no mínimo 3 caracteres']);
        const jobRules = reactive([v => !!v || 'Digite uma profissão/ocupação.', v => v.length > 5 || 'A profissão/ocupação precisa ter no mínimo 5 caracteres']);

        const openAddUserWindow = () => isWindowOpen.value = !isWindowOpen.value

        const goToUserCardsListView = () => {
            router.push({ name: 'listUsers' });
        }

        const goToResourcesListView = () => {

        }

        const isValidForm = () => {
            const condition = name.length >= 3 && job.length >= 5;
            console.log("🚀 ~ isValidForm ~ condition:", condition)
            return condition;
        }

        const handleForm = async () => {
            const snackStore = useSnackBarStore();
            isLoading.value = !isLoading.value;
            const userData = {
                name: name.value,
                job: job.value,
            }
            const response = await userService.addUser(userData);
            isLoading.value = !isLoading.value;
            if (response.status === 200 || response.status === 201) {
                snackStore.updateMessage(`Usuário ${userData.name} foi adicionado com sucesso!`);
            } else {
                snackStore.updateMessage("Falha ao adicionar o usuário.");
            }
            openAddUserWindow();
        }

        return {
            name,
            job,
            isWindowOpen,
            isLoading,
            nameRules,
            jobRules,
            openAddUserWindow,
            goToUserCardsListView,
            goToResourcesListView,
            isValidForm,
            handleForm
        }
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
                <v-btn rounded="lg" variant="flat" color="green" @click="openAddUserWindow()">Adicionar um
                    usuário</v-btn>
                <v-btn rounded="lg" variant="flat" color="purple" @click="goToUserCardsListView()">Listar todos
                    usuários</v-btn>
                <v-btn rounded="lg" variant="flat" color="deep-orange" @click="goToResourcesListView()">Mapear
                    recursos</v-btn>
            </div>
        </v-card>
        <v-sheet elevation="24" height="500" width="360" id="dashboard-add-user-window"
            :style="`${isWindowOpen.value ? 'display: flex; flex-direction:column; z-index: 100' : 'display: none'}`"
            rounded>

            <v-form fast-fail @submit.prevent="handleForm()">
                <v-card class="mx-auto pa-12 pb-8" :loading="isLoading.value" elevation="8" max-width="448"
                    rounded="lg">
                    <h1 class="text-center">Adicionar Usuário</h1>
                    <div class="text-subtitle-1 text-medium-emphasis">Nome</div>

                    <v-text-field density="compact" placeholder="Digite seu nome completo" variant="outlined"
                        :rules="nameRules" v-model="name"></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                        Profissão
                    </div>

                    <v-text-field density="compact" placeholder="Digite seu nome completo" variant="outlined"
                        :rules="jobRules" v-model="job"></v-text-field>

                    <v-btn class="mb-8 add-user-button" color="blue" size="large" variant="tonal" type="submit"
                        :disabled="isValidForm()" block>
                        Enviar
                    </v-btn>
                    <v-btn class="mb-8 add-user-button" color="red" size="large" variant="tonal"
                        @click="openAddUserWindow()" block>
                        Fechar
                    </v-btn>
                </v-card>
            </v-form>
        </v-sheet>
    </v-container>
</template>

<style lang="scss" scoped>
#dashboard-container {
    height: 100%;

    .dashboard-card {
        height: 100%;
    }

    .add-user-button {
        width: 80%;
    }
}

#dashboard-add-user-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>