export default ({
    state: {
        patient: {},
        dialog: false,
        dialogDelete: false,
        action: ''
    },
    getters: {
        getPatient: state => state.patient,
        getDialog: state => state.dialog,
        getDialogDelete: state => state.dialogDelete,
        getAction: state => state.action,
    },
    mutations: {
        setPatient: (state, data) => state.patient = data,
        setDialog: (state, data) => state.dialog = data,
        setDialogDelete: (state, data) => state.dialogDelete = data,
        setAction: (state, data) => state.action = data,
    },
    actions: {
        changePatient: ({ commit }, data) => commit("setPatient", data),
        changeDialog: ({ commit }, data) => commit("setDialog", data),
        changeDialogDelete: ({ commit }, data) => commit("setDialogDelete", data),
        changeAction: ({ commit }, data) => commit("setAction", data),
    },
})