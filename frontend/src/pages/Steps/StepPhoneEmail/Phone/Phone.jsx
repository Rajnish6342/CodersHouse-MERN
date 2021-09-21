import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '../../../../Components/Shared/Button/Button'
import Card from '../../../../Components/Shared/Card/Card'
import TextInput from '../../../../Components/Shared/TextInput/TextInput'
import { sendOtp } from '../../../../http'
import { setOtp } from '../../../../store/authSlice'

import styles from '.././StepPhoneEmail.module.css'


const Phone = ({ onNext }) => {
  const [phone, setPhone] = useState('')
  const dispatch = useDispatch()
  async function submit() {
    const { data } = await sendOtp({ phone })
    dispatch(setOtp({ phone: data.phone, hash: data.hash }))
    onNext()
  }
  return (
    <Card title="Enter your Phone number" icon="phone">
      <TextInput value={phone} onChange={(e) => { setPhone(e.target.value) }} />
      <div >
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit} />
        </div>
      </div>
    </Card>
  )
}

export default Phone
