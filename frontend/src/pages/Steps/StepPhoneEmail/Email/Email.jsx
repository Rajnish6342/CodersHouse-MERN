import React, { useState } from 'react'

import Button from '../../../../Components/Shared/Button/Button'
import Card from '../../../../Components/Shared/Card/Card'
import TextInput from '../../../../Components/Shared/TextInput/TextInput'

import styles from '.././StepPhoneEmail.module.css'



const Email = ({onNext}) => {
  const [email, setEmail] = useState('')
  return (
    <Card title="Enter your Email" icon="email-emoji">
      <TextInput value={email} onChange={(e) => { setEmail(e.target.value) }} />
      <div >
        <div className={styles.actionButtonWrap}>
          <Button text="Next"  onClick={onNext} />
        </div>
      </div>
    </Card>
  )
}

export default Email
