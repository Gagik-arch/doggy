import type nuvojs from './index';

declare global {
    interface Window {
        'nuvo-js': typeof nuvojs;
    }
}
 
export { }