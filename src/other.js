const text = 'boom!';

export default () => new Promise(resolve => {

    setTimeout(() => resolve(text), 1000);
});
