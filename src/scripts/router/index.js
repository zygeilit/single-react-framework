import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Base from '../components/Base'
import HomeView from './../containers/home/index'

const routes = {
    path: '/',
    component: Base,
    indexRoute: { component: HomeView },
    childRoutes: [
        {
            path: '/home',
            component: HomeView
        }
    ]
};

export default routes