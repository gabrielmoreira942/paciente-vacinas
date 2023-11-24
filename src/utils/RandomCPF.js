export function gerarCPF() {
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

    let v = n.map((d, i) => d * (9 - (i % 10))).reduce((acc, curr) => acc + curr) % 11;
    n.push(v > 9 ? 0 : v);

    v = n.map((d, i) => d * (10 - (i % 10))).reduce((acc, curr) => acc + curr) % 11;
    n.push(v > 9 ? 0 : v);

    return n.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

