import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../Components/Shared/Button/Button'
import Card from '../../../Components/Shared/Card/Card'
import { activate } from '../../../http'
import { setAvatar } from '../../../store/activateSlice'
import { setAuth } from '../../../store/authSlice'

import styles from './StepAvatar.module.css'



const StepAvatar = ({ onNext }) => {
  const { name: storedName, avatar } = useSelector((state) => state.activate)
  const dispatch = useDispatch()
  const [image, setImage] = useState('/images/monkey-avatar.png')

  async function submit() {
    try {
      const { data } = await activate({ avatar, name: storedName })
      if (data.auth) {
        dispatch(setAuth(data))
      }
    } catch (error) {
      console.log(error);
    }
  }
  function captureImage({ target }) {
    const file = target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      setImage(reader.result)
      dispatch(setAvatar(reader.result));
    }
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Okay ${storedName}`} icon="monkey-emoji">
          <p className={styles.subHeading}>How's this photo</p>
          <div className={styles.avatarWrapper}>
            <img src={image} alt="user-avatar" className={styles.avatarImage} />
          </div>
          <div>
            <input type="file" id="avatarInput" className={styles.avatarInput} onChange={captureImage} />
            <label htmlFor="avatarInput" className={styles.avatarLabel}>Click here to Change</label>
          </div>
          <div className={styles.actionButtonWrap}>
            <Button onClick={submit} text="Next" />
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepAvatar
