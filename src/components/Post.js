import { useState, useEffect } from "react"
import Markdown from "markdown-to-jsx"
import '../styles/Post.css'

const Post = () => {
  const [postContent, setPostcontent] = useState('')

  useEffect(() => {
    import('../tutorials/tutorial1.md')
      .then(res =>
        fetch(res.default)
          .then(response => response.text())
          .then(response => setPostcontent(response))
          .catch(err => console.log(err))
      )
  }, [])

  return (
    <div className="article-wrapper">
      <article>
        <header>
          
        </header>
        <main>
          <Markdown>
            {postContent}
          </Markdown>
        </main>
      </article>
    </div>
  )
}

export default Post