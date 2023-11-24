import Vue from 'vue';
const vue = new Vue();
import Swal from 'sweetalert2';
import { errorMessage } from './errors.js'
export async function getVaccineManager() {
    try {
        const { data } = await vue.$api.manager.get('vaccine-manager');
        return data;
    } catch (error) {
        return errorMessage(error);
    }
}
export async function getStates() {
    try {
        const { data } = await vue.$api.manager.get('vaccine-manager/states');
        return data;
    } catch (error) {
        return errorMessage(error);
    }
}
export async function filterVaccineManager(filter) {
    try {
        const { data } = await vue.$api.manager.get(`vaccine-manager/manufacturer/${filter.manufacturer}?state=${filter.state}`);
        return data;
    } catch (error) {
        return errorMessage(error);
    }
}
export async function filterPatientManager(id) {
    try {
        const { data } = await vue.$api.manager.get(`vaccine-manager/patient/${id}`);
        return data;
    } catch (error) {
        return errorMessage(error);
    }
}
export async function getPatientById(id) {
    try {
        const { data } = await vue.$api.manager.get(`vaccine-manager/patient/${id}`);
        return data;
    } catch (error) {
        return errorMessage(error);
    }
}
export async function filterOverdueManager(state) {
    try {
        const { data } = await vue.$api.manager.get(`vaccine-manager/overdue?state=${state}`);
        return data;
    } catch (error) {
        return errorMessage(error);
    }
}

export async function createVaccineManager(data) {
    try {
        const result = await vue.$api.manager.post('vaccine-manager', data);
        Swal.fire({
            icon: "success",
            title: "Vacinação Cadastrada!",
            html: `<p><span>Vacinação cadastrada com sucesso!</span></p>`,
            showConfirmButton: false,
            timer: 2000,
        });
        return result;
    } catch (error) {
        return errorMessage(error)
    }
}

export async function editVaccineManager(data) {
    try {
        const result = await vue.$api.manager.put(`vaccine-manager/${data.id}`, data);
        Swal.fire({
            icon: "success",
            title: "Vacinação Adicionada!",
            html: `<p><span>A vacinação foi adicionada com sucesso!</span></p>`,
            showConfirmButton: false,
            timer: 2000,
        });
        return result;
    } catch (error) {
        return errorMessage(error)
    }
}
export async function removeLastVaccineManager(id) {
    try {
        await vue.$api.manager.patch(`vaccine-manager/${id}`);
        Swal.fire({
            icon: "success",
            title: "Última vacinação removida!",
            html: `<p><span>A última vacina foi excluída com sucesso!</span></p>`,
            showConfirmButton: false,
            timer: 2000,
        });
        return true;
    } catch (error) {
        return errorMessage(error)
    }
}