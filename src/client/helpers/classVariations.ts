export default (name: string, variations: string[] = []) => {
    return [name].concat(variations.map(variant => `${name}--${variant}`)).join(' ');
};
