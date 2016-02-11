import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from './components/app'
import PostsList from './components/posts_list'
import PostsShow from './components/posts_show'

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ PostsList } />
    <Route path="posts" component={ PostsList }/>
    <Route path="posts/show" component={ PostsShow }/>
  </Route>
)
