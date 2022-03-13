import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'

export function SigInButton() {
    const isUserLogin = true;

    return isUserLogin ? (
        <button
        type="button"
        className={styles.sigInButton}
        >
            <FaGithub color="#04D361"/>
            beagle.git27866
            <FiX color="#737380" className={styles.closeIcon}/>            
        </button>
    ):(
        <button
        type="button"
        className={styles.sigInButton}
        >
            <FaGithub color="#EBA417"/>
            Sig in with Github          
        </button>
    )
}