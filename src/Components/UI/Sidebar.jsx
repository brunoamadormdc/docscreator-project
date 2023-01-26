import styles from './Sidebar.module.scss'
import {ReactComponent as BurgerMenu} from '../../assets/images/burger_menu.svg';
import { useRecoilState } from 'recoil';
import {sidebarState} from '../../Store/Sidebar-atom';
import { useCallback } from 'react';

export default function Sidebar() {

    const [sidebar, setSidebar] = useRecoilState(sidebarState);
    
    const changeSidebar = () => {
       setSidebar(!sidebar);
    }

    return (
        <>
        <div className={`${styles['__burgerMenu']}`} onClick={changeSidebar}>
        <BurgerMenu />
        </div>

        <div className={`${styles['__sidebar']}  ${sidebar ? styles['__open'] : styles['__close']}`}>
            
        </div>
        </>
    )
}