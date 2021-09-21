import React from 'react'

import styles from './TextInput.module.css'

const TextInput = (props) => {
  return (
    <div>
      <input type="text" className={styles.input} {...props} />
    </div>
  )
}

export default TextInput
