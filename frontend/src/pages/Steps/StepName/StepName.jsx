import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../Components/Shared/Button/Button'
import Card from '../../../Components/Shared/Card/Card'
import TextInput from '../../../Components/Shared/TextInput/TextInput'
import { setName as setUserName } from '../../../store/activateSlice'
import styles from './StepName.module.css'



const StepName = ({ onNext }) => {
  const storedName = useSelector((state) => state.activate.name)
  const dispatch = useDispatch()

  async function submit() {
    try {
      if (!name) return
      dispatch(setUserName({ name }))
       onNext()
    } catch (error) {
      console.log(error);
    }
  }
  const [name, setName] = useState(storedName)

  return (
    <>
     <div className={styles.cardWrapper}>
      <Card title="Whats your full Name" icon="goggle-emoji">
        <TextInput value={name} onChange={(e) => setName(e.target.value)} />
        <div className={styles.actionButtonWrap}>
          <Button onClick={submit} text="Next" />
        </div>
      </Card>
      </div>
    </>
  )
}

export default StepName
