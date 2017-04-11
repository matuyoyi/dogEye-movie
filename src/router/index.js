import Vue from 'vue'
import Router from 'vue-router'
import movieList from '@/components/movieList'
import comingSoon from '@/components/comingSoon'
import movieDetail from '@/components/movieDetail'
import shortCmt from '@/components/shortCmt'
import comment from '@/components/comment'
import castDetail from '@/components/castDetail'
import searchPage from '@/components/searchPage'
import searchResult from '@/components/searchResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
    path: '/inTheaters',
    name: 'movieList',
    component: movieList
    },
    {
      path: '/comingSoon',
      name: 'comingSoon',
      component: comingSoon
    },
    {
    	path: '/movieDetail/:id',
    	name: 'movieDetail',
    	component: movieDetail
    },
    {
      path: '/movieDetail/shortCmt/:id',
      name: 'shortCmt',
      component: shortCmt
    },
    {
      path: '/movieDetail/comment/:id',
      name: 'comment',
      component: comment
    },
    {
      path: '/castDetail/:id',
      name: 'castDetail',
      component: castDetail
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult
    }
  ]
})

