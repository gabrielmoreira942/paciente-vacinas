import Vue from 'vue';
const vue = new Vue();
import Swal from 'sweetalert2';


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