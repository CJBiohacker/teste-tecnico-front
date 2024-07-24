<script>
import router from '@/router';

export default {
    setup() {
        const goToLoginRegisterView = path => router.push({ path });
        return { goToLoginRegisterView }
    },
};
</script>

<template>
    <v-container id="welcome-container" fluid>
        <v-col cols="md-4" offset="lg-4" id="welcome-box">
            <v-card color="light" elevation="8" variant="flat" class="mx-auto pa-10 text-body-1 d-flex flex-column align-center justify-space-evenly" id="welcome-card">
                <div class="d-flex flex-column align-center justify-center ga-2">
                    <p class="text-center text-h4">Seja bem vindo ao<br> UI-Versidade</p>
                    <p class="text-center text-subtitle-1">O melhor sistema de Gerenciamento para sua Instituição Educacional.</p>
                    <p class="text-center text-subtitle-1">Administre cadastros de usuários e recurso em segundos.</p>
                    <p class="text-center text-subtitle-1">Faça o Login ou seu Cadastro</p>
                </div>
                <div class="d-flex justify-center align-center ga-5">
                    <v-btn class="welcome-btn" rounded="lg" variant="flat" color="green" size="large"
                        @click="goToLoginRegisterView('login')">Login</v-btn>
                    <v-btn class="welcome-btn" rounded="lg" variant="flat" color="blue" size="large"
                        @click="goToLoginRegisterView('register')">Cadastro</v-btn>
                </div>
            </v-card>
        </v-col>
    </v-container>
</template>

<style scoped lang="scss">
#welcome-container {
    height: 100%;

    #welcome-box {
        height: 100%;

        #welcome-card {
            height: 100%;
        }

        .welcome-row {

            .welcome-btn {
                padding: 10px 20px;
                cursor: pointer;
                transition: background-color 0.2s ease-in-out;
            }
        }
    }
}
</style>

<!-- Lembrar de ajustar a config dos ícones mdi do vuetify -->