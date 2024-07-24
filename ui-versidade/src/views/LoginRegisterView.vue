<script>
import { computed, defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSnackBarStore } from '@/stores/snackbar';
import router from '@/router';
import authService from '@/services/auth.service';

export default defineComponent({
    setup() {
        const route = useRoute();
        const emailRegexp = /^[a-z0-9]+(?:[._-][a-z0-9]+)*@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

        const email = ref('');
        const password = ref('');
        const visible = ref(false);

        const emailRules = reactive([v => !!v || 'Digite um email', v => emailRegexp.test(v) || 'Formato de email inválido']);
        const passwordRules = reactive([v => !!v || 'Digite uma senha', v => (v && v.length < 6) ? 'Digite uma senha de 6 ou mais caracteres' : '']);
        const isLoading = reactive({ value: false })

        const confirmBtnText = computed(() => {
            return route.name === 'login' ? 'Entrar' : 'Cadastrar'
        });

        const cardTitle = computed(() => {
            return route.name === 'login' ? 'Login' : 'Cadastro'
        })

        const isValidForm = () => {
            const condition = emailRegexp.test(email.value) && (password.value.length >= 6);
            return !condition;
        }


        const registerSnackResponse = (statusCode) => {
            const snackStore = useSnackBarStore();
            if (statusCode === 200 || statusCode === 201) {
                snackStore.updateMessage("Usuário cadastrado com sucesso!");
            } else {
                snackStore.updateMessage("Falha ao cadastrar o usuário!");
            }
        }

        const swapBetweenLoginRegisterView = () => {
            if (route.name === 'login') {
                router.push({ name: 'register' });
            }
            if (route.name === 'register') {
                router.push({ name: 'login' });
            }
        }

        const handleForm = async () => {
            let userCredentials;
            let response;
            isLoading.value = !isLoading.value
            if (confirmBtnText.value === 'Entrar') {
                userCredentials = {
                    email: email.value,
                    password: password.value,
                }

                response = await authService.login(userCredentials);
                isLoading.value = !isLoading.value
                router.push({ name: 'dashboard' });
            }

            if (confirmBtnText.value === 'Cadastrar') {
                userCredentials = {
                    email: email.value,
                    password: password.value,
                }
                response = await authService.register(userCredentials);
                registerSnackResponse(response.status);
                isLoading.value = !isLoading.value
                router.push({ name: 'login' });
            }
        }

        return {
            route,
            email,
            password,
            visible,
            emailRules,
            passwordRules,
            isLoading,
            cardTitle,
            confirmBtnText,
            isValidForm,
            swapBetweenLoginRegisterView,
            registerSnackResponse,
            handleForm
        }
    },
});
</script>

<template>
    <v-container>
        <v-col cols="md-6 lg-4" offset="sm-3 md-2">
            <v-container>
                <v-form fast-fail @submit.prevent="handleForm()">
                    <v-card class="mx-auto pa-12 pb-8" :loading="isLoading.value" elevation="8" max-width="448"
                        rounded="lg">
                        <h1 class="text-center">{{ cardTitle }}</h1>
                        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

                        <v-text-field density="compact" placeholder="Email address" variant="outlined"
                            :rules="emailRules" v-model="email"></v-text-field>

                        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                            Senha
                        </div>

                        <v-text-field :type="visible ? 'text' : 'password'" density="compact"
                            placeholder="Enter your password" variant="outlined" :rules="passwordRules"
                            v-model="password"></v-text-field>

                        <v-btn class="mb-8" color="blue" size="large" variant="tonal" type="submit"
                            :disabled="isValidForm()" block>
                            {{ confirmBtnText }}
                        </v-btn>

                        <v-card-text class="text-center">
                            <v-btn class="text-blue text-decoration-none" variant="text" size="small" height="auto"
                                width="auto" @click="swapBetweenLoginRegisterView()">
                                <p v-if="route.name === 'login'"
                                    v-html="'Ainda não tem cadastro?<br>Clique aqui e crie uma conta.'">
                                </p>
                                <p v-else v-html="'Já tem cadastro?<br>Clique aqui e faça o login.'">
                                </p>
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-container>
        </v-col>
        
    </v-container>
</template>