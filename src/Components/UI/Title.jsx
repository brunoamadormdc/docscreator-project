import styles from './Title.module.scss';

export default function Title({title, subtitle}) {
    return (
        <>
        <div className={styles['__containerTitle']}>
            <h1 className={styles['__title']}>{title}</h1>
            <h5 className={styles['__subtitle']}>{subtitle}</h5>
        </div>
        </>
    );
}