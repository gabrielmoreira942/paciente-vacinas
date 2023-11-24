export default ({
    state: {
        vaccine: {},
        dialogDeleteVaccine: false,
        dialogVaccine: false,
        vaccineAction: '',
    },
    getters: {
        getVaccine: state => state.vaccine,
        getDialogDeleteVaccine: state => state.dialogDeleteVaccine,
        getDialogVaccine: state => state.dialogVaccine,
        getActionVaccine: state => state.vaccineAction,
    },
    mutations: {
        setVaccine: (state, data) => state.vaccine = data,
        setDialogVaccine: (state, data) => state.dialogVaccine = data,
        setDialogDeleteVaccine: (state, data) => state.dialogDeleteVaccine = data,
        setActionVaccine: (state, data) => state.vaccineAction = data,
    },
    actions: {
        changeVaccine: ({ commit }, data) => commit("setVaccine", data),
        changeDialogVaccine: ({ commit }, data) => commit("setDialogVaccine", data),
        changeDialogDeleteVaccine: ({ commit }, data) => commit("setDialogDeleteVaccine", data),
        changeActionVaccine: ({ commit }, data) => commit("setActionVaccine", data),

    },
})