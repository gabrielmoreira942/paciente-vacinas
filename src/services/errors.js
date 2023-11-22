import Swal from 'sweetalert2';

export function errorMessage(error) {
    let errorMessage = ''
    if (typeof error.response.data.mensagem == 'string') {
        for (const field in error.response.data) {
            errorMessage += `${error.response.data[field]}<br>`;
        }

    } else {
        for (const field in error.response.data.mensagem) {
            errorMessage += `${error.response.data.mensagem[field]}<br>`;
        }
    }
    Swal.fire({
        icon: "error",
        title: "Aviso!",
        html: errorMessage,
        showConfirmButton: true,
        timerProgressBar: true,
    });
    return {
        status: 'error'
    }
}