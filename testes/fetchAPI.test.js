const { fetchAPI } = require('../fetchAPI');
const dataFirst = require('../mocks/data');

describe( '1 - Teste a função fetchAPI', () => {
  
  beforeEach(()=> {
    global.fetch = jest.fn().mockImplementation(fetchAPI())
    jest.spyOn(global, "fetch").mockImplementation(fetchAPI())
  });
  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });
  it('Teste se fetchAPI é uma função; ', async () => {
    const fetchAPI = await fetchAPI();
    expect(typeof fetchAPI).toBe('function');
  });
  it('Execute a função fetchAPI e teste se fetch foi chamada;', async () => {
    const fetch = await fetchAPI()
    expect(fetch).toHaveBeenCalled();
  });
  it('Teste se, ao chamar a função fetchAPI a função fetch utiliza o endpoint ', async () => {
    const fetch = await fetchAPI()
    expect(fetch).toHaveBeenCalledWith('https://us-central1-squid-apis.cloudfunctions.net/test-front-basic');
  });
  it('Teste se o retorno da função fetchAPI é uma estrutura de dados igual ao objeto dataFirst', async () => {
   const [resultados] = await fetchAPI()
   expect(resultados).toMatchObject([dataFirst]);
  } );
  it('Teste se, ao chamar a função fetchAPI com link incorreto retorna um erro com a mensagem: Failed to fetch ', async () => {
    expect(await fetchAPI()).toEqual(new Error('Failed to fetch'));
  });
});
