import NotFound from '../components/NotFound';

export default [
    {
        path: '/',
        component: null,
    },
    {
        path: '*',
        component: NotFound,
    },
];
