export default ({
    state: {
        vaccineManager: {},
        actionVaccineManager: "",
        disabledVaccineManager: false,

        vaccineManagerDialog: false,
        vaccineManagerSearchDialog: false,
    },
    getters: {
        getVaccineManager: state => state.vaccineManager,
        getActionVaccineManager: state => state.actionVaccineManager,
        getDisabledVaccineManager: state => state.disabledVaccineManager,
        
        getVaccineManagerDialog: state => state.vaccineManagerDialog,
        getVaccineManagerSearchDialog: state => state.vaccineManagerSearchDialog,
    },
    mutations: {
        setVaccineManager: (state, data) => (
            state.vaccineManager = data,
            localStorage.setItem('storageVaccineManager', JSON.stringify(data)
            )),
        setActionVaccineManager: (state, data) => state.actionVaccineManager = data,
        setDisabledVaccineManager: (state, data) => state.disabledVaccineManager = data,

        // ANCHOR - MUTATIONS DIALOGS
        setVaccineManagerDialog: (state, data) => state.vaccineManagerDialog = data,
        setVaccineManagerSearchDialog: (state, data) => state.vaccineManagerSearchDialog = data, 
    },
    actions: {
        changeVaccineManager: ({ commit }, data) => commit("setVaccineManager", data),

        changeActionVaccineManager: ({ commit }, data) => commit("setActionVaccineManager", data),

        changeDisabledVaccineManager: ({ commit }, data) => commit("setDisabledVaccineManager", data),

        // ANCHOR - ACTION DIALOGS
        changeVaccineManagerDialog: ({ commit }, data) => commit("setVaccineManagerDialog", data),
        changeVaccineManagerSearchDialog: ({ commit }, data) => commit("setVaccineManagerSearchDialog", data),
    },
})