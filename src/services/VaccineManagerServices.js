import Vue from 'vue';
const vue = new Vue();
import Swal from 'sweetalert2';

export async function getVaccineManager() {
    try {
        const { data } = await vue.$api.manager.get('vaccine-manager');
        return data;
    } catch (error) {
        throw error;
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
        throw error;
    }
}

export async function editVaccineManager(data) {
    try {
        const result = await vue.$api.patient.put(`vaccine-manager/${data.id}`, data);
        Swal.fire({
            icon: "success",
            title: "Vacinação Editada!",
            html: `<p><span>O paciente vacinado foi editado com sucesso!</span></p>`,
            showConfirmButton: false,
            timer: 2000,
        });
        return result;
    } catch (error) {
        getErrors(error)
    }
}