

import pages from '../pages';

const getNextAndPrev = (current) => {
    const routes = getRoutes();
    let currentIndex = routes.findIndex(r => current && r.name === current.name);
    if (currentIndex === -1) {
        currentIndex = 0;
    }
    let prev = currentIndex - 1;
    if (prev === -1) {
        prev = routes.length - 1;
    }
    let next = currentIndex + 1;
    if (next === routes.length) {
        next = 0;
    }
    return {
        next: routes[next],
        prev: routes[prev]
    }
};

const getRoutes = () => {
    const routes = [{
        path: '/',
        name: 'main',
        component: pages.main
    }];
    pages.sections.forEach(section => {
        section.pages.forEach(page => {
            routes.push({
                path: '/' + page.name,
                name: page.name,
                component: page
            })
        });
    });
    console.log(routes);
    return routes;
};

export default {
    getNextAndPrev,
    getRoutes
}