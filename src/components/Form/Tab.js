import styles from '@/styles/components/Form.module.scss'

export default function Tab({ children, props }) {
  const { active, handleClick } = props

  return (
    <button
      className={styles.tab}
      data-active={active}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
