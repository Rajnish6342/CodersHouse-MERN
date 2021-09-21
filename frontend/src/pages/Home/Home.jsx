import React from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../Components/Shared/Button/Button'
import Card from '../../Components/Shared/Card/Card'

import styles from './Home.module.css'
const Home = () => {
  const signInLinkStyle = {
    color: '#0077ff',
    textDecoration: "none",
    fontWeight: 'bold',
    marginLeft: "10px"
  }
  const history = useHistory()
  const startRegister = (e) => {
    history.push('/authenticate')
  }
  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to CodersHouse" icon="logo">
        <p className={styles.text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Repudiandae dolorum sint unde in eaque
          fugit quos sed veritatis, deleniti aliquam eius, culpa dolorem aperiam vel!
        </p>
        <div >
          <Button onClick={startRegister} text="Let's Go" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.signinWrapper}>
            Have an Invite?
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Home
