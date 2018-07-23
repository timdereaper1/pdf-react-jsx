export function isClass(element) {
    try {
        const component = new element();
        component.render();
        return true;
    } catch (error) {
        return false;
    }
}

export function handleClass(element, props) {
    const component = new element(props);
    component.componentWillMount();
    return component.render();
}

export function isStateLess(element) {
    return typeof element === 'function';
}