export function gerarCPF() {
    const cpfArray = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
  
    let sum = 0;
    let weight = 10;
  
    for (let i = 0; i < 9; i++) {
      sum += cpfArray[i] * weight;
      weight--;
    }
  
    let verifyingDigit = 11 - (sum % 11);
    cpfArray.push(verifyingDigit >= 10 ? 0 : verifyingDigit);
  
    sum = 0;
    weight = 11;
  
    for (let i = 0; i < 10; i++) {
      sum += cpfArray[i] * weight;
      weight--;
    }
  
    verifyingDigit = 11 - (sum % 11);
    cpfArray.push(verifyingDigit >= 10 ? 0 : verifyingDigit);
  
    return cpfArray.join('');
  }
  