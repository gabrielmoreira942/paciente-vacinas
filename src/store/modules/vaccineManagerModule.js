export default ({
    state: {
        vaccineManager: {},
        vaccineManagerDialog: false,
        actionVaccineManager: "",
    },
    getters: {
        getVaccineManager: state => state.vaccineManager,
        getActionVaccineManager: state => state.actionVaccineManager,
        getVaccineManagerDialog: state => state.vaccineManagerDialog,
    },
    mutations: {
        setVaccineManager: (state, data) => (
            state.vaccineManager = data,
            localStorage.setItem('storageVaccineManager', JSON.stringify(data)
            )),
        setActionVaccineManager: (state, data) => state.actionVaccineManager = data,
        setVaccineManagerDialog: (state, data) => state.vaccineManagerDialog = data,
    },
    actions: {
        changeVaccineManager: ({ commit }, data) => commit("setVaccineManager", data),

        changeActionVaccineManager: ({ commit }, data) => commit("setActionVaccineManager", data),

        changeVaccineManagerDialog: ({ commit }, data) => commit("setVaccineManagerDialog", data),
    },
})