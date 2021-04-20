
import obj from './object';

// типа lodash.get
export const get = obj.get;

export function debounce(f, ms) {
    let isCooldown = false;
    return function() {
        if (isCooldown) return;
        f.apply(this, arguments);
        isCooldown = true;
        setTimeout(() => (isCooldown = false), ms);
    };
}

const _ = { get, debounce };

export default _;