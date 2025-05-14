import {useState, useEffect} from 'react';
    export default function Parameter_section({children, type}) {
    const [display_menu, set_display] = useState(false);
    const [fade, set_fade] = useState('');
    const [layer_priority, set_priority] = useState('');
        useEffect(() => {
            const timer = setTimeout(() => {
                if (fade === ' fading') {
                set_display(false);
                set_fade('');
                }
            }, 250);
        return () => clearTimeout(timer);
        }, [fade]);
        function fade_in() {
        set_display(true);
        set_fade('');
        set_priority(' active_menu');
        }
        function fade_out() {
        set_fade(' fading');
        set_priority('');
        }
        return (
        <div className={"parameter_section" + layer_priority} onMouseOver={() => fade_in()} onMouseOut={() => fade_out()}>
            <span className="parameter_button">
                <img src={require('../icons/' + type + '.png')} draggable="false" alt=""></img>
            </span>
            {display_menu && <div className={"parameter_menu " + type + fade}>
                {children}
            </div>}
        </div>
        )
    }