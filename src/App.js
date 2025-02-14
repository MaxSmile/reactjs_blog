import Post from './components/Post'

import { LogoIcon } from './assets/icons'
import './styles/App.css'

// another title to get https://llama2.maxim-e72.workers.dev/


const App = () => {
  return (
    <>
      <header className='header'>
        <div className='header__content'>
          <div className='logo'><LogoIcon /><strong>Blog of Decentralized Thoughts</strong></div>
        </div>
      </header>
      <main className='main'>
        <Post />
      </main>
    </>
  )
}

export default App
