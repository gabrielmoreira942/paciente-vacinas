import Vue from 'vue';
const vue = new Vue();

export async function getVaccine() {
    try {
        const { data } = await vue.$api.vaccine.get('vaccine');
        return data;
    } catch (error) {
        throw error;
    }
}
export async function createVaccine(data) {
    try {
        const result = await vue.$api.vaccine.post('vaccine', data);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function mockVaccine() {
    try {
        await vue.$api.vaccine.post('vaccine/mock-vaccines');
        return 'Mock de vacinas efetuado com sucesso!'
    } catch (error) {
        throw error;
    }
}