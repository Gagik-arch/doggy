import { Element, Store, Fragment  } from '@nuvo-js/core'
import { Button,Input } from './uikit';

function App() {
    const store = new Store<{ id: string, title: string }[]>([])
    
    const input =  new Input({
        name: 'asd',
        
    })
    
    return (
        Fragment([
             new Element<HTMLDivElement>({
                    tagName: 'div',
                    props: {
                        className:'row',
                        children: [
                            input.dom,

                            new Button({
                                children: [
                                    'save'
                                ]
                            }).dom
                        ]
                    }
                }).dom
            ])
    );
}

export default App;
