import Vue from 'vue';
const vue = new Vue();
import Swal from 'sweetalert2';
export async function getPatient() {
    try {
        const { data } = await vue.$api.patient.get('patient');
        return data;
    } catch (error) {
        throw error;
    }
}
export async function createPatient(data) {
    try {
        const result = await vue.$api.patient.post('patient', data);
        Swal.fire({
            icon: "success",
            title: "Paciente Cadastrado!",
            html: `<p><span>Paciente cadastrado com sucesso!</span></p>`,
            showConfirmButton: false,
            timer: 2000,
        });
        return result;
    } catch (error) {
        let errorMessage = ''
        for (const field in error.response.data.mensagem) {
            errorMessage += `${error.response.data.mensagem[field]}<br>`;
        }
        Swal.fire({
            icon: "error",
            title: "Ocorreu um erro!",
            html: errorMessage,
            showConfirmButton: true,
            timerProgressBar: true,
          });
    }
}
export async function mockPatient() {
    try {
        await vue.$api.patient.post('patient/mock-patients');
        return 'Mock de pacientes efetuado com sucesso!'
    } catch (error) {
        throw error;
    }
}