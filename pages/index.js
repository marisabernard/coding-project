import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home() {

  const [publicRepos, setPublicRepos] = useState(null)
  const [lastVisibleRepo, setLastVisibleRepo] = useState(null)

  useEffect(()=>{
      getPublicRepos()
  },[])

  const getPublicRepos = () => {
    axios({
      method: 'get',
      url: 'https://api.github.com/repositories',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      params:lastVisibleRepo?{
        since:lastVisibleRepo
      }:null
    })
      .then((response) => {
        setPublicRepos(lastVisibleRepo?[...publicRepos,...response?.data]:response?.data)
        setLastVisibleRepo(response?.data[response?.data?.length-1]?.id)
      }).catch((error)=> {
        console.log(error)
        setPublicRepos(null)
        setLastVisibleRepo(null)
      })
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Project</title>
        <meta name="description" content="Coding Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>
          Public Github Repositories
        </h1>

        <div className={styles.scrollgrid}>
          {publicRepos?.map((repo, index)=>{
            if(index === publicRepos?.length-1){
              return <div className={styles.special} key={repo?.id}>
                <a key={repo?.id} href={`${repo?.html_url}`} className={styles.card}>
            <h2>{repo?.full_name}</h2>
            <p>{repo?.description}</p>
          </a>
          <button className={styles.button} onClick={getPublicRepos}>Get More Repositories</button>
              </div>
            }
            else {
            return <a key={repo?.id} href={`${repo?.html_url}`} className={styles.card}>
            <h2>{repo?.full_name}</h2>
            <p>{repo?.description}</p>
          </a>}
          })}
        </div>


      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
