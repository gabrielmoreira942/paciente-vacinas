export default ({
    state: {
        patient: {},
        dialog: false,
        dialogDelete: false,
        action: ''
    },
    getters: {
        getPatient: state => state.patient,
        getDialogPatient: state => state.dialog,
        getDialogDeletePatient: state => state.dialogDelete,
        getAction: state => state.action,
    },
    mutations: {
        setPatient: (state, data) => state.patient = data,
        setPatientView: (state, data) => localStorage.setItem('patientView', JSON.stringify(data)),
        setDialogPatient: (state, data) => state.dialog = data,
        setDialogDeletePatient: (state, data) => state.dialogDelete = data,
        setAction: (state, data) => state.action = data,
    },
    actions: {
        changePatient: ({ commit }, data) => commit("setPatient", data),
        changePatientView: ({ commit }, data) => commit("setPatientView", data),
        changeDialogPatient: ({ commit }, data) => commit("setDialogPatient", data),
        changeDialogDeletePatient: ({ commit }, data) => commit("setDialogDeletePatient", data),
        changeAction: ({ commit }, data) => commit("setAction", data),
    },
})