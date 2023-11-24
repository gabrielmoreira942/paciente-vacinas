export default ({
    state: {
        vaccine: {},
        dialogDeleteVaccine: false,
        vaccineAction: '',
    },
    getters: {
        getVaccine: state => state.vaccine,
        getDialogDeleteVaccine: state => state.dialogDeleteVaccine,
        getActionVaccine: state => state.vaccineAction,
    },
    mutations: {
        setVaccine: (state, data) => state.vaccine = data,
        setDialogDeleteVaccine: (state, data) => state.dialogDeleteVaccine = data,
        setActionVaccine: (state, data) => state.vaccineAction = data,
    },
    actions: {
        changeVaccine: ({ commit }, data) => commit("setVaccine", data),
        changeDialogDeleteVaccine: ({ commit }, data) => commit("setDialogDeleteVaccine", data),
        changeActionVaccine: ({ commit }, data) => commit("setActionVaccine", data),

    },
})