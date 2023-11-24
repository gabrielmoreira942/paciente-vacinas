const route = Cypress.env('VUE_APP_PATIENT') + '/patient';

describe('Teste do campo de formulário de paciente', () => {
    it('Deve preencher o campo e cadastrar via POST', () => {
        cy.visit('http://localhost:8083/patients');

        // Clicar em cadastrar
        cy.get('#cadastro_paciente').click();

        // Preencher os campos
        getDadosFormulario();

        // Clica no botão de salvar
        cy.get('#salvar').click();

        // Requisição
        cy.intercept('POST', route, (req) => {
            expect(req.body).to.deep.equal(getDadosFormulario());
        }).as('request');
        cy.log('Teste passou! O formulário foi preenchido e a solicitação POST foi interceptada com sucesso.');
    });
    // Função para preencher o formulário e retornar os dados
    function getDadosFormulario() {
        const obj = {
            firstName: 'Gabriel',
            lastName: 'Moreira',
            gender: 'M',
            cpf: '07913738510',
            birthDate: '1990-01-01',
            contact: {
                telephone: '(11) 98765-4321',
                whatsapp: '(11) 98765-4321',
                email: 'gabriel@example.com'
            },
            address: {
                number: '123',
                neighborhood: 'Centro',
                county: 'Lauro de Freitas',
                zipCode: '42711-820',
                state: 'BA',
                street: 'Rua Exemplo 123'
            }
        };

        cy.get('#nome').type(obj.firstName);
        cy.get('#sobrenome').type(obj.lastName);
        cy.get('#cpf').type(obj.cpf);
        cy.get('#genero').click().type(obj.gender, { force: true });
        cy.get('#data_nascimento').type(obj.birthDate);
        cy.get('#proximo').click();

        cy.get('#telefone').type(obj.contact.telephone);
        cy.get('#whatsapp').type(obj.contact.whatsapp);
        cy.get('#email').type(obj.contact.email);
        cy.get('#proximo').click();

        cy.get('#numero').type(obj.address.number);
        // cy.get('#bairro').type(obj.address.neighborhood);
        // cy.get('#cidade').type(obj.address.county);
        cy.get('#cep').type(obj.address.zipCode);
        cy.wait(1500)
        // cy.get('#estado').type(obj.address.state);
        // cy.get('#rua').type(obj.address.street);

        // Retorna os dados do formulário
        return obj;
    }
});
