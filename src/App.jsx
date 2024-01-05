import { useState } from 'react'
import styles from './global.module.css';
const App = () => {
  const [nome, setNome] = useState ('');
  const [altura, setAltura] = useState ('');
  const [peso, setPeso] = useState ('');
  const [imc, setIMC] = useState (null);
  const [classificacao, setClassificacao] = useState ('');
  const [erro, setErro] = useState ('');
  const calcularIMC = () => {
    setErro ('');
    if (isNaN (altura) || isNaN (peso) || altura <=0 || peso <= 0) {
      setErro ('Por favor, insira seu nome e valores válidos para sua altura e peso corporal total.')
      setTimeout (() => {
          setErro ('');
        }, 5000);
      return; {/* para validar os números do usuário e não ocorrer nenhum erro */}
    }
    const alturaMetros = altura / 100;
    const calculoIMC = peso / (alturaMetros * alturaMetros);
    const arrendondadoIMC = parseFloat (calculoIMC.toFixed(2));
    setIMC (arrendondadoIMC);
    definirClassificacao (arrendondadoIMC);
  }
  const definirClassificacao = (imc) => {
    if (imc < 18.5) {
      setClassificacao ('abaixo do peso normal');
    }
    else if (imc >= 18.5 && imc < 24.9) {
      setClassificacao ('peso normal');
    }
    else if (imc >= 25 && imc < 29.9) {
      setClassificacao ('acima do peso normal');
    }
    else if (imc >= 30 && imc < 34.9) {
      setClassificacao ('grau de obesidade 1');
    }
    else if (imc >= 35 && imc < 39.9) {
      setClassificacao ('grau de obesidade 2');
    }
    else {
      setClassificacao ('grau de obesidade 3');
    } 
  }
  const limparDados = () => {
  setNome('');
  setAltura('');
  setPeso('');
  setIMC(null);
  setClassificacao('');
  setErro('');
  }
  return (
    <div className={styles.form}>
      <h1> Calculadora para Índice de Massa Corporal - EBAC</h1>
      <form>
        <div className={styles.fieldGroup}>
        <div className={styles.field}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome (e.target.value)} />
        </label>
        </div>
        <br />
        <br />
        <div className={styles.field}>
        <label>
          Altura (cm):
          <input type="number" value={altura} onChange={(e) => setAltura (e.target.value)} />
        </label>
        </div>
        <br />
        <br />
        <div className={styles.field}>
        <label>
          Peso total (kg):
          <input type="number" value={peso} onChange={(e) => setPeso (e.target.value)} />
        </label>
        </div>
        </div>
        <br />
        <button className={styles.button} type="button" onClick={calcularIMC}>
          Calcular IMC
        </button>
        <button className={styles.button} type="button" onClick={limparDados}>
          Limpar
        </button>
      </form>
      <br />
      {erro && <p style={{color: 'red'}}>{erro}</p>}
      {imc !== null && (
        <div>
          <h2> Resultado </h2>
          <br />
          <p>
            {nome}, seu IMC é {imc} e sua classificação é: {classificacao}.
          </p>
          <br />
          <p>
          <b>
          É importante destacar que o IMC tem algumas limitações e não é uma medida perfeita da composição corporal ou saúde individual.
          </b>
          </p>
          <br />
          <p>
          * Não diferenciação entre <b>Massa Magra e Gordura</b>: O IMC não faz distinção entre a massa magra (músculos, ossos) e a massa gorda.
          </p>
          <p>
          * Não considera <b>Distribuição de Gordura</b>: Não leva em conta a distribuição de gordura no corpo.
          </p>
          <p>
          * Não considera a <b>Idade ou Gênero</b>: O IMC é uma medida genérica que não leva em conta as diferenças relacionadas à idade e ao gênero.
          </p>
          <p>
          * Não avalia a <b>Aptidão Física</b>: Não reflete a condição física ou a saúde cardiovascular.
          </p>
        </div>
      )}
    </div>
  )
}
export default App