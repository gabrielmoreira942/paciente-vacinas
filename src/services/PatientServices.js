import Vue from 'vue';
const vue = new Vue();

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
        return result;
    } catch (error) {
        throw error;
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