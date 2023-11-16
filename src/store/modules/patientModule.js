export default ({
    state: {
        patient: {},
        dialog: false,
        action: ''
    },
    getters: {
        getPatient: state => state.patient,
        getDialog: state => state.dialog,
        getAction: state => state.action,
    },
    mutations: {
        setPatient: (state, data) => state.patient = data,
        setDialog: (state, data) => state.dialog = data,
        setAction: (state, data) => state.action = data,
    },
    actions: {
        changePatient: ({ commit }, data) => commit("setPatient", data),
        changeDialog: ({ commit }, data) => commit("setDialog", data),
        changeAction: ({ commit }, data) => commit("setAction", data),
    },
})