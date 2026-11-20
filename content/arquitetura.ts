// Traço técnico (gerado a partir da foto recortada) usado na animação "do projeto ao real".
// Se não houver traço para a linha, a foto se materializa sozinha.
const comTraco = ["agua", "combustivel", "saneamento", "agricola"];
export const lineartFor = (slug: string) => (comTraco.includes(slug) ? `/img/arquitetura/${slug}-linhas.webp` : null);
