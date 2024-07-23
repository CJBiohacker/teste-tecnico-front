<script>
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
    setup() {
        const goToLoginRegisterView = (path) => {
            router.push({path});
        }

        return {
            goToLoginRegisterView,
        }
    },
});
</script>

<template>
    <v-container id="welcome-container">
        <v-col cols="md-4" offset="lg-4" id="welcome-box">
            <v-card color="light" elevation="8" variant="flat" class="mx-auto text-body-1" id="welcome-card">
                <v-row class="welcome-row" align="center" justify="center" no-gutters>
                    <p class="text-center">SEJA BEM VINDO <br>ao<br> UI-Versidade </p>
                    <p class="text-center">O melhor sistema de Gerenciamento para sua Instituição Educacional.<br>
                        Crie, edite, liste e exclua cadastros de alunos e professores em alguns segundos.</p>
                </v-row>
                <v-row class="welcome-row" align="center" justify="center" no-gutters>
                    <p>Faça o Login ou seu Cadastro</p>
                </v-row>
                <v-row class="welcome-row" align="center" justify="space-evenly" no-gutters>
                    <v-btn class="welcome-btn" rounded="lg" variant="tonal" size="large"
                        @click="goToLoginRegisterView('login')">Login</v-btn>
                    <v-btn class="welcome-btn" rounded="lg" variant="tonal" size="large"
                        @click="goToLoginRegisterView('register')">Cadastro</v-btn>
                </v-row>
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
            height: 30%;
            padding: 30px;

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