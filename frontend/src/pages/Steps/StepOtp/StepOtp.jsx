import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '../../../Components/Shared/Button/Button'
import Card from '../../../Components/Shared/Card/Card'
import TextInput from '../../../Components/Shared/TextInput/TextInput'
import { verifyOtp } from '../../../http'
import { setAuth } from '../../../store/authSlice'


import styles from './StepOtp.module.css'


const StepOtp = () => {
  const [otp, setOtp] = useState('')
  const { hash, phone } = useSelector((state) => state.auth.otp)
  const dispatch = useDispatch()
  async function submit() {
    try {
      const { data } = await verifyOtp({ otp, hash, phone })
      dispatch(setAuth(data))
      // onNext()
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you" icon="lock-emoji">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepOtp
